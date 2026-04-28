import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema({
    // id: {type:Number, required: true}, // The 'id' field is of type Number and is required. It serves as a unique identifier for each friendship record.

    status: {type:String, required:true},

    created_at: {type: Date, default: Date.now}, 

    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},

    friend_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true} 
})

export const Friendship = mongoose.model("Friendship", friendshipSchema);

