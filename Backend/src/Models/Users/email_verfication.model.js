import mongoose from "mongoose";
const emailVerificationSchema = new mongoose.Schema({
    // id: {type: Number, required: true}, // The 'id' field is of type Number and is required. It serves as a unique identifier for each email verification record.

    token: {type: String, required: true}, 

    expiresAt: {type: Date}, 

    verifiedAt: {type: Date},

    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true} 


},{
    timestamps:true 
})

export const EmailVerification = mongoose.model("EmailVerification", emailVerificationSchema);

