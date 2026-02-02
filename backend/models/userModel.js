import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    address: { 
        type: Object, 
        default: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        }
    },
    cartData: { type: Object, default: {} }
}, { minimize: false, timestamps: true })

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel