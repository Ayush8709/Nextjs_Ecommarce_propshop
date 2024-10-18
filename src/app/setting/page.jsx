'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Page = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/auth/me');
            const { _id } = response.data.data;
            setUserId(_id);
            // console.log('User ID:', _id);
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    const fetchOrders = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/saveorder/${userId}`);
            setOrders(response.data.orders); // Adjusted to access the orders array
            console.log('The data is', response.data.orders);
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchOrders(userId);
        }
    }, [userId]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-10">Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Orders</h1>
            <ul className="space-y-4">
                {orders.map((order) => (
                    <li key={order._id} className="border rounded-lg shadow p-4 bg-white">
                        <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
                        <p className="mt-2"><span className="font-medium">Payment Mode:</span> {order.paymentMode}</p>
                        <p><span className="font-medium">Total Price:</span> ${order.totalPrice}</p>
                        <p className="mt-2 font-medium">Shipping Address:</p>
                        <p>Address: {order.shippingAddress.address}</p>
                        <p>City: {order.shippingAddress.city}</p>
                        <p>Pincode: {order.shippingAddress.pincode}</p>
                        <p>Country: {order.shippingAddress.country}</p>
                        <p className="mt-2"><span className="font-medium">Is Paid:</span> {order.isPaid ? 'Yes' : 'No'}</p>
                        <p><span className="font-medium">Is Delivered:</span> {order.isDelivered ? 'Yes' : 'No'}</p>
                        <h3 className="mt-4 font-semibold">Cart Items:</h3>
                        <ul className="space-y-2">
                            {order.cartItems.map((item, index) => (
                                <li key={index} className="border p-2 rounded bg-gray-100">
                                    <p><span className="font-medium">Name:</span> {item.name}</p>
                                    <p><span className="font-medium">Quantity:</span> {item.qty}</p>
                                    <p><span className="font-medium">Price:</span> ${item.price}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page;
