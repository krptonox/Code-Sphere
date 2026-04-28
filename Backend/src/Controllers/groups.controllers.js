import mongoose from "mongoose";
import asyncHandler from "../Utils/asyncHandler.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import { Group } from "../Models/FeedPage/groups.model.js";
import { GroupMember } from "../Models/FeedPage/group_members.model.js";
import { GroupMessage } from "../Models/FeedPage/group_messages.model.js";
import { broadcastGroupMessage } from "../websocket/groupSocket.js";

const formatGroup = (group, isMember = false) => ({
    _id: group._id,
    group_name: group.group_name,
    member_count: group.member_count ?? 0,
    current_challenge: group.current_challenge || "",
    created_at: group.created_at,
    created_by: group.created_by,
    isMember,
});

const formatMessage = (message) => ({
    _id: message._id,
    group_id: message.group_id,
    message: message.message,
    sender: {
        _id: message.sender_id?._id || message.sender_id,
        username: message.sender_id?.username || "Unknown",
    },
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
});

const validateGroupId = (groupId) => {
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
        throw new ApiError(400, "Invalid group id");
    }
};

const ensureGroupMembership = async (userId, groupId) => {
    const membership = await GroupMember.findOne({ user_id: userId, group_id: groupId });

    if (!membership) {
        throw new ApiError(403, "You are not a member of this group");
    }

    return membership;
};

const getGroups = asyncHandler(async (req, res) => {
    const [groups, memberships] = await Promise.all([
        Group.find().populate("created_by", "username").sort({ created_at: -1 }).lean(),
        GroupMember.find({ user_id: req.user._id }).select("group_id").lean(),
    ]);

    const membershipSet = new Set(memberships.map((membership) => String(membership.group_id)));
    const formattedGroups = groups
        .map((group) => formatGroup(group, membershipSet.has(String(group._id))))
        .sort((firstGroup, secondGroup) => {
            const membershipDiff = Number(secondGroup.isMember) - Number(firstGroup.isMember);
            if (membershipDiff !== 0) {
                return membershipDiff;
            }

            return new Date(secondGroup.created_at).getTime() - new Date(firstGroup.created_at).getTime();
        });

    return res.status(200).json(
        new ApiResponse(200, {
            groups: formattedGroups,
        }, "Groups fetched successfully"),
    );
});

const createGroup = asyncHandler(async (req, res) => {
    const body = req.body || {};
    const groupName = String(body.group_name ?? body.groupName ?? "").trim();
    const currentChallenge = String(body.current_challenge ?? body.currentChallenge ?? "").trim();

    if (!groupName) {
        throw new ApiError(400, "Group name is required");
    }

    const existingGroup = await Group.findOne({ group_name: groupName });

    if (existingGroup) {
        throw new ApiError(409, "Group name already exists");
    }

    const createdGroup = await Group.create({
        group_name: groupName,
        current_challenge: currentChallenge || undefined,
        member_count: 1,
        created_by: req.user._id,
    });

    await GroupMember.create({
        user_id: req.user._id,
        group_id: createdGroup._id,
        role: "admin",
    });

    const populatedGroup = await Group.findById(createdGroup._id).populate("created_by", "username").lean();

    return res.status(201).json(
        new ApiResponse(201, {
            group: formatGroup(populatedGroup, true),
        }, "Group created successfully"),
    );
});

const joinGroup = asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    validateGroupId(groupId);

    const group = await Group.findById(groupId);

    if (!group) {
        throw new ApiError(404, "Group not found");
    }

    const existingMembership = await GroupMember.findOne({
        user_id: req.user._id,
        group_id: groupId,
    });

    if (!existingMembership) {
        await GroupMember.create({
            user_id: req.user._id,
            group_id: groupId,
            role: "member",
        });

        await Group.findByIdAndUpdate(groupId, {
            $inc: { member_count: 1 },
        });
    }

    const populatedGroup = await Group.findById(groupId).populate("created_by", "username").lean();

    return res.status(200).json(
        new ApiResponse(200, {
            group: formatGroup(populatedGroup, true),
        }, existingMembership ? "Already a member" : "Joined group successfully"),
    );
});

const getGroupMessages = asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    validateGroupId(groupId);

    await ensureGroupMembership(req.user._id, groupId);

    const group = await Group.findById(groupId).populate("created_by", "username").lean();

    if (!group) {
        throw new ApiError(404, "Group not found");
    }

    const messages = await GroupMessage.find({ group_id: groupId })
        .sort({ createdAt: 1 })
        .populate("sender_id", "username")
        .lean();

    return res.status(200).json(
        new ApiResponse(200, {
            group: formatGroup(group, true),
            messages: messages.map(formatMessage),
        }, "Group messages fetched successfully"),
    );
});

const sendGroupMessage = asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    validateGroupId(groupId);

    await ensureGroupMembership(req.user._id, groupId);

    const body = req.body || {};
    const messageText = String(body.message ?? body.content ?? "").trim();

    if (!messageText) {
        throw new ApiError(400, "Message is required");
    }

    const createdMessage = await GroupMessage.create({
        group_id: groupId,
        sender_id: req.user._id,
        message: messageText,
    });

    const populatedMessage = await GroupMessage.findById(createdMessage._id)
        .populate("sender_id", "username")
        .lean();

    const formattedMessage = formatMessage(populatedMessage);
    broadcastGroupMessage(formattedMessage);

    return res.status(201).json(
        new ApiResponse(201, {
            message: formattedMessage,
        }, "Message sent successfully"),
    );
});

export {
    createGroup,
    getGroupMessages,
    getGroups,
    joinGroup,
    sendGroupMessage,
};
