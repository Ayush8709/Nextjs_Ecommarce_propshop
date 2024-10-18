import { createSlice } from "@reduxjs/toolkit";

// Initial state for the order
const initialState = {
    order: {
        items: [],
        shippingAddress: {},
        paymentMode: '',
        totalPrice: 0,
        orderStatus: 'Pending',
        createdAt: null,
    },
};

// Create order slice
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrderDetails(state, action) {
            const { items, shippingAddress, paymentMode, totalPrice } = action.payload;
            state.order.items = items;
            state.order.shippingAddress = shippingAddress;
            state.order.paymentMode = paymentMode;
            state.order.totalPrice = totalPrice;
            state.order.createdAt = new Date().toISOString(); // Set creation date
            state.order.orderStatus = 'Pending'; // Set initial status
        },
        clearOrder(state) {
            state.order = initialState.order;
        },
        saveOrderFromServer(state, action) {
            const { items, shippingAddress, paymentMode, totalPrice, orderStatus, createdAt } = action.payload;
            state.order = {
                items,
                shippingAddress,
                paymentMode,
                totalPrice,
                orderStatus,
                createdAt,
            };
        },
        saveUser(state,action){
            state.order.user=action.payload;
            console.log('thsi is orderSlice user', action.payload)
        }
    },
});

// Export actions
export const { setOrderDetails, clearOrder, saveOrderFromServer,saveUser } = orderSlice.actions;

// Export reducer
export default orderSlice.reducer;
