// components/CheckoutSteps.js
import React from 'react';
import Link from 'next/link';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div className="flex justify-center  mb-4 space-x-4">
            <div className='p-2'>
                {step1 ? (
                    <Link href="/login" className="text-gray-500 hover:underline">
                        Sign In
                    </Link>
                ) : (
                    <span className="text-gray-500 cursor-not-allowed">Sign In</span>
                )}
            </div>

            <div className='p-2'>
                {step2 ? (
                    <Link href="/form" className="text-gray-500 hover:underline">
                        Shipping
                    </Link>
                ) : (
                    <span className="text-gray-500 cursor-not-allowed">Shipping</span>
                )}
            </div>

            <div className='p-2'>
                {step3 ? (
                    <Link href="/payment" className="text-gary-500 hover:underline">
                        Payment
                    </Link>
                ) : (
                    <span className="text-gray-500 cursor-not-allowed">Payment</span>
                )}
            </div>

            <div className='p-2'>
                {step4 ? (
                    <Link href="/placeorder" className="text-gray-500 hover:underline">
                        Place Order
                    </Link>
                ) : (
                    <span className="text-gray-500 cursor-not-allowed">Place Order</span>
                )}
            </div>
        </div>
    );
};

export default CheckoutSteps;
