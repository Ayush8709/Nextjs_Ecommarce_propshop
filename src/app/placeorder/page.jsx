'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '@/myComponents/checStemp';
import { setOrderDetails } from '@/redux/slice/orderSlice';
import axios from 'axios';

const Page = () => {
    const dispatch = useDispatch();

    const cartState = useSelector(state => state.cart);
    const { cartItems, shippingAddress, paymentMode } = cartState;

    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    // Use effect to set mounted state
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Calculate total price
    const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0).toFixed(2);

    const handlePayment = async () => {
        if (!cartItems.length || !shippingAddress || !paymentMode) {
            console.error('Missing order details');
            return;
        }

        setLoading(true); // Set loading state

        // Prepare order details
        const orderDetails = {
            items: cartItems.map(item => ({
                id: item._id,
                name: item.name,
                qty: item.qty,
                price: item.price,
                category: item.category,
                description: item.description,
                image: item.image
            })),
            shippingAddress,
            paymentMode,
            totalPrice,
        };

        // Dispatch action to save order details to Redux
        dispatch(setOrderDetails(orderDetails));
        console.log("Order details saved to Redux state:", orderDetails);

        try {
            // Call the backend to create a checkout session using Axios
            const response = await axios.post('http://localhost:3000/api/payment', orderDetails);
            console.log("Checkout session response:", response.data.success);
            const id = '670d3f3d0bb27c8c36dacae8'
            if (response.data.success === true) {
                const saveOrderResponse = await axios.post(`http://localhost:3000/api/saveorder`, { cartItems, shippingAddress, paymentMode });
                console.log('Order saved:', saveOrderResponse.data);
                window.location.href = response.data.url
                // Clear local storage on success
                localStorage.clear();
            }

            setLoading(false); // Reset loading state
        } catch (error) {
            console.error('Unexpected error:', error);
            setLoading(false); // Reset loading state on error
        }
    };

    // Prevent rendering until mounted
    if (!isMounted) return <p>Loading...</p>;

    return (
        <>
            <CheckoutSteps step1={true} step2={true} step3={true} step4={true} />

            <div className="p-8 max-w-2xl mx-auto">
                <h2 className="text-4xl font-semibold mb-6">Order Summary</h2>

                {/* Display shipping address */}
                <div className="mb-4">
                    <h3 className="text-2xl font-semibold">Shipping Address</h3>
                    {shippingAddress && Object.keys(shippingAddress).length > 0 ? (
                        <div className="border p-4 rounded-lg">
                            <p>{shippingAddress.address}</p>
                            <p>{shippingAddress.city}</p>
                            <p>{shippingAddress.pincode}</p>
                            <p>{shippingAddress.country}</p>
                        </div>
                    ) : (
                        <p className="text-red-500">No shipping address available</p>
                    )}
                </div>

                {/* Display products */}
                <div className="mb-4">
                    <h3 className="text-2xl font-semibold">Products</h3>
                    {cartItems && cartItems.length > 0 ? (
                        <ul className="space-y-4">
                            {cartItems.map((product, index) => (
                                <li key={index} className="border p-4 rounded-lg flex justify-between">
                                    <div>
                                        <h4 className="text-lg font-semibold">{product.name}</h4>
                                        <p>Price: ₹{product.price.toFixed(2)}</p>
                                        <p>Quantity: {product.qty}</p>
                                    </div>
                                    {product.image && (
                                        <div>
                                            <img src={product.image} alt={product.name} className="w-16 h-16" />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-red-500">No products in the cart</p>
                    )}
                </div>

                {/* Display total price */}
                <div className="mb-4">
                    <h3 className="text-2xl font-semibold">Total Price</h3>
                    {cartItems && cartItems.length > 0 ? (
                        <div className="border p-4 rounded-lg">
                            <p>Total: ₹{totalPrice}</p>
                        </div>
                    ) : null}
                </div>

                {/* Display payment mode */}
                <div className="mb-4">
                    <h3 className="text-2xl font-semibold">Payment Mode</h3>
                    {paymentMode ? (
                        <div className="border p-4 rounded-lg">
                            <p>{paymentMode}</p>
                        </div>
                    ) : (
                        <p className="text-red-500">No payment mode selected</p>
                    )}
                </div>

                {/* Payment button */}
                <button
                    onClick={handlePayment}
                    className="mt-4 bg-black text-white font-semibold p-4 rounded-md hover:bg-gray-700 transition duration-200"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
            </div>
        </>
    );
};

export default Page;
