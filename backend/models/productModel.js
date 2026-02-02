import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array },
    ecoFriendly: { type: Boolean, default: true },
    ecoAttributes: { type: Array, default: [] }, // e.g., ["recycled", "organic", "biodegradable"]
    materials: { type: Array, default: [] }, // e.g., ["bamboo", "organic cotton", "recycled plastic"]
    bestseller: { type: Boolean },
    date: { type: Number, required: true }
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel