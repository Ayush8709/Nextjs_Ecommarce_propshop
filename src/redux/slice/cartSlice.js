import { createSlice } from "@reduxjs/toolkit";

// Function to get data from localStorage safely
const getLocalStorageData = (key, defaultValue) => {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    }
    return defaultValue;
};

// Initial state of the cart
const initialState = {
    cartItems: getLocalStorageData('cartItems', []), // Load initial state from localStorage
    shippingAddress: getLocalStorageData('shippingAddresh', {}),
    paymentMode: getLocalStorageData('paymentMode', ''),
};

// Create cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const { product, qty } = action.payload; // Destructure payload
            const existItem = state.cartItems.find(x => x._id === product._id);

            if (existItem) {
                // Update the existing item
                state.cartItems = state.cartItems.map(x =>
                    x._id === existItem._id ? { ...existItem, qty: qty } : x
                );
            } else {
                // Add new item to the cart
                state.cartItems.push({ ...product, qty });
            }

            // Save to localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        },
        removeItemFromCart: (state, action) => {
            // Expect action.payload to be the product ID
            state.cartItems = state.cartItems.filter(x => x._id !== action.payload);
            // Save updated cart to localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            // Save to localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        },
        saveShippingAddress: (state, action) => {
            console.log('this is shipping address', action.payload)
            state.shippingAddress = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem('shippingAddresh', JSON.stringify(state.shippingAddress));
            }
        },
        savePaymentMode: (state, action) => {
            state.paymentMode = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem('paymentMode', JSON.stringify(state.paymentMode));
            }
        },
    },
});

// Export actions
export const {
    addItemToCart,
    removeItemFromCart,
    clearCart,
    saveShippingAddress,
    savePaymentMode
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
