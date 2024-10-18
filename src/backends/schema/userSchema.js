import mongoose from "mongoose";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is compulsory'],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true, 
        match: [emailRegex, 'Please fill a valid email address'], 
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    profilePicture: {
        type: String,
        default: '',
    },
    // dateOfBirth: {
    //     type: Date, // Optional date of birth
    // },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
