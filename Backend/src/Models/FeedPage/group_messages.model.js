import mongoose from "mongoose";

const groupMessageSchema = new mongoose.Schema(
    {
        group_id: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true, index: true },
        sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
        message: { type: String, required: true, trim: true, maxlength: 2000 },
    },
    {
        timestamps: true,
    },
);

groupMessageSchema.index({ group_id: 1, createdAt: 1 });

export const GroupMessage = mongoose.model("GroupMessage", groupMessageSchema);
