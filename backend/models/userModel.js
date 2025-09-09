import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
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
        phone: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer",
        },
        address: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String,
        },
        // FIX: Corrected typo from "whishlist" to "wishlist"
        wishlist: [
            {
                // FIX: Changed to String to be compatible with frontend static data.
                // When you load products from the DB, you can change this back to ObjectId and add ref: 'Product'.
                type: String,
            },
        ],
        cart: [
            {
                product: {
                    // FIX: Changed to String to be compatible with frontend static data.
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        orders: [
            {
                // Note: This references an 'Order' model that you will need to create later.
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Hashes password before saving the user model
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// FIX: Renamed to matchPassword to align with the authController
userSchema.methods.matchPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;