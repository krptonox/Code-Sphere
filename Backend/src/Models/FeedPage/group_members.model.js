import mongoose from "mongoose";

const groupMemberSchema = new mongoose.Schema({
    // id: {type: Number, required: true },// The 'id' field is of type Number and is required. It serves as a unique identifier for each group member record.

    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, 

    group_id: {type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true}, 

    role: {type: String, required: true}, 

    joined_at: {type: Date, default: Date.now} 
})

export const GroupMember = mongoose.model("GroupMember", groupMemberSchema);
