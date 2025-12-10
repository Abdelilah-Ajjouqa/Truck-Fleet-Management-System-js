import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'DRIVER'],
        default: 'DRIVER'
    },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;