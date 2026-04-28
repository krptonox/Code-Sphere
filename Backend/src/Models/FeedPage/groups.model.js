import mongoose from "mongoose";

const groupsSchema = new mongoose.Schema({
    // id: {type:Number, required: true}, // The 'id' field is of type Number and is required. It serves as a unique identifier for each group record.

    group_name: {type:String, required:true}, 

    member_count: {type:Number, default: 0}, 

    current_challenge: {type:String}, 

    created_at: {type: Date, default: Date.now}, 

    created_by: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true} 
})

export const Group = mongoose.model("Group", groupsSchema);


