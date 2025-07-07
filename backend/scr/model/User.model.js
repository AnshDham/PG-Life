import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
    collegeName:{
        type: String,
        required: true,
        trim: true
    },
    phoneNumber:{
        type: String,
        required: true,
        trim: true
    },
    faverateProperties:[],
    gender:{
        type: String,
        enum: ["male", "female"],
        default: "male"
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

const User =mongoose.model("User", UserSchema);

export default User;
