import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
    },
    cartItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
        },
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMode: {
        type: String,
        required: true,
    },
    // paymentResult: {
    //     id: { type: String },
    //     status: { type: String },
    //     update_time: { type: String },
    //     email_address: { type: String },
    // },
    taxPrice: { // Default dont look out below this line
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
