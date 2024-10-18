import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch product data
export const listProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await axios.get('http://localhost:3000/api/product');
        return response.data;
    }
);

//fetch single Product
export const listSingleProduct = createAsyncThunk(
    'products/fetchSingleProduct',
    async (id) => {
        const response = await axios.get(`http://localhost:3000/api/product/${id}`)
        return response.data;
    }
)

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
        singleProductDetails: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        //sepreate all the builders for each components
        fetchAllProducts(builder)
        fetchSingleProduct(builder)
    },
});

// all products fetch
export const fetchAllProducts = (builder) => {

    builder
        .addCase(listProducts.pending, (state) => { // jab api call hoga tab kuch second ke liye loading hota hai ye wahi wala loading hai
            state.loading = true;
            state.error = null; // Clear previous error when starting a new request
        })
        .addCase(listProducts.fulfilled, (state, action) => { // agar api chal gaya to sara data yaha aa jayega
            state.loading = false;
            state.products = action.payload; // Assuming action.payload is the correct data
        })
        .addCase(listProducts.rejected, (state, action) => { // agar api call nahi hua to ye error show ho jayega
            state.loading = false; // Ensure loading is set to false
            state.error = action.error.message; // Set the error message
        });
}


// Single product fetch

export const fetchSingleProduct = (builder) => {
    builder
        .addCase(listSingleProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(listSingleProduct.fulfilled, (state, action) => {
            state.loading = false,
                state.singleProductDetails = action.payload.product
        })
        .addCase(listSingleProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
}

// Export the reducer
export default productSlice.reducer;
