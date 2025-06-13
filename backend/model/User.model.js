import mongoose from "mongoose";

const USerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    role:{
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    verificationToken:{
        type: String,
        default: null
    },
    resetPasswordToken:{
        type: String,
        default: null
    },
    resetPasswordExpires:{
        type: Date,
        default: null
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }

})

mongoose.model("User", USerSchema);