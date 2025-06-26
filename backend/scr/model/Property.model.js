import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
    {
        propertyTitle:{
            type: String,
            required: true,
            trim: true
        },
        description:{
            type: String,
            required: true,
            trim: true
        },
        location:{
            type: String,
            required: true,
            trim: true
        },
        price:{
            type: Number,
            required: true,
            min: 0
        },
        reating:{
            type: Number,
            default: 0,
            min: 0,
        },
        images: [{
            type: String,
            required: true
        }],
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now
        },
        updatedAt:{
            type: Date,
            default: Date.now
        }
    },
    
)

const Property = mongoose.model("Property", propertySchema);

export default Property