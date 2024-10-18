// pages/shipping/page.js
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMode } from '@/redux/slice/cartSlice';
import CheckoutSteps from '@/myComponents/checStemp';

const Page = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const allOrder = useSelector(state => state.cart);
    const { paymentMode } = allOrder;

    const [paymentMethod, setPaymentMethod] = useState('');
    console.log("Current payment method:", paymentMethod);

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (paymentMethod) {
            dispatch(savePaymentMode(paymentMethod)); // Save payment mode
            router.push('/placeorder'); // Redirect to the place order page
        }
    };

    // Disable button for QR and Net Banking
    const isButtonDisabled = paymentMethod === 'QR' || paymentMethod === 'Net Banking';

    return (
        <>
            <CheckoutSteps
                step1={true}
                step2={true}
                step3={true}
                step4={false}
            />
            <form onSubmit={handleSubmit} className="p-8 rounded-lg w-full max-w-lg mx-auto">
                <h2 className="text-4xl font-semibold mb-6 uppercase">Select Payment Mode</h2>

                <div className="mb-4">
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="qr"
                            name="paymentMethod"
                            value="QR"
                            checked={paymentMethod === 'QR'}
                            onChange={handlePaymentChange}
                            className="mr-2"
                        />
                        <label htmlFor="qr" className="text-sm font-medium text-gray-700">QR Payment</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="stripe"
                            name="paymentMethod"
                            value="Stripe"
                            checked={paymentMethod === 'Stripe'}
                            onChange={handlePaymentChange}
                            className="mr-2"
                        />
                        <label htmlFor="stripe" className="text-sm font-medium text-gray-700">Stripe</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="netBanking"
                            name="paymentMethod"
                            value="Net Banking"
                            checked={paymentMethod === 'Net Banking'}
                            onChange={handlePaymentChange}
                            className="mr-2"
                        />
                        <label htmlFor="netBanking" className="text-sm font-medium text-gray-700">Net Banking</label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isButtonDisabled}
                    className={`mt-2 ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-black hover:bg-gray-700'} text-white font-semibold p-4 py-2 rounded-md transition duration-200`}
                >
                    Continue
                </button>
            </form>
        </>
    );
};

export default Page;
