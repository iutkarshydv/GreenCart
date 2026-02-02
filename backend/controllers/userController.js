import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = createToken(user._id)
            res.json({ success: true, token })

        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // checking user already exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route to get user profile
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId).select('-password');
        
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        res.json({ success: true, user })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route to update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { userId, name, email, phone, address } = req.body;

        console.log('Updating profile for user:', userId);
        console.log('Update data:', { name, email, phone, address });

        // Validate email if it's being updated
        if (email && !validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // Check if email is already taken by another user
        if (email) {
            const existingUser = await userModel.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                return res.json({ success: false, message: "Email already in use" })
            }
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone !== undefined) updateData.phone = phone;
        if (address !== undefined) updateData.address = address;

        console.log('Final update data:', updateData);

        const user = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select('-password');

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        console.log('Profile updated successfully:', user);
        res.json({ success: true, message: "Profile updated successfully", user })

    } catch (error) {
        console.log('Update profile error:', error);
        res.json({ success: false, message: error.message })
    }
}

// Route to change password
const changePassword = async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;

        const user = await userModel.findById(userId);
        
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Current password is incorrect" })
        }

        // Validate new password
        if (newPassword.length < 8) {
            return res.json({ success: false, message: "New password must be at least 8 characters" })
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password changed successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile, changePassword }