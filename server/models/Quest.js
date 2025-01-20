import mongoose from 'mongoose';

const questSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true
    },
    prize: {
        type: String,
        enum: ["SilverChest", "GoldenChest", "DiamondChest", "EmeraldChest", "BlackChest"],
        required: true
    },
    hasClaimed: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
})