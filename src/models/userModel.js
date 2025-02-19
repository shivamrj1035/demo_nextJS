import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, "please provide a username"] },
    email: { type: String, required: true, unique: [true, "please provide an email"] },
    password: { type: String, required: [true, "please provide a password"] },
    // role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { type: Boolean, default : false},
    isAdmin : { type: Boolean, default : false},
    forgotPasswordToken : { type: String},
    forgotPasswordTokenExpiry : { type: Date},
    verifyToken : { type: String},
    verifyTokenExpiry : { type: Date}
})


const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;