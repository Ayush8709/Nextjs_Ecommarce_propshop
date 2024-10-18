// pages/shipping/page.js
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '@/redux/slice/cartSlice';
import CheckoutSteps from '@/myComponents/checStemp';

const ShippingPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector(state => state.cart);

  const [formData, setFormData] = useState({
    address: shippingAddress?.address || '',
    city: shippingAddress?.city || '',
    pincode: shippingAddress?.pincode || '',
    country: shippingAddress?.country || 'India', // Default country
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(formData));
    router.push('/payment'); // Navigate to payment page
  };

  return (
    <>
      <CheckoutSteps
        step1={!!shippingAddress}
        step2={true}
        step3={false}
        step4={false}
      />
      <form onSubmit={handleSubmit} className="p-8 rounded-lg w-full max-w-lg mx-auto">
        <h2 className="text-4xl font-semibold mb-6 uppercase">Shipping</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-3 p-2 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm focus:ring-opacity-50"
            placeholder="Address"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-3 p-2 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm focus:ring-opacity-50"
            placeholder="City"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="pincode">Pincode</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="mt-3 p-2 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm focus:ring-opacity-50"
            placeholder="Pincode"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-3 p-2 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm focus:ring-opacity-50"
            placeholder="Country"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-black text-white font-semibold p-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
        >
          Continue
        </button>
      </form>
    </>
  );
};

export default ShippingPage;
