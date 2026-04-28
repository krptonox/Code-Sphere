import mongoose from "mongoose";
const platformConnectionSchema = mongoose.Schema({
    // id: {type:Number, required: true}, // The 'id' field is of type Number and is required. It serves as a unique identifier for each platform connection record.

    platform_name: {type:String, required:true},

    platform_username: {type:String, required:true}, 

    is_connected: {type:Boolean, default:false}, 

    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},

    synced_at: {type: Date} 
})

export const PlatformConnection = mongoose.model("PlatformConnection", platformConnectionSchema);

