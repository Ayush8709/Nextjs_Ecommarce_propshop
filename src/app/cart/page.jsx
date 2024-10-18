'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart } from '@/redux/slice/cartSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Page = () => {
    const allData = useSelector((state) => state.cart);
    const { cartItems } = allData;

    const [quantities, setQuantities] = useState({});
    const navigate = useRouter();
    const dispatch = useDispatch();

    const removeItems = (id) => {
        dispatch(removeItemFromCart(id));
    };

    const handleQuantityChange = (itemId, value) => {
        setQuantities((prev) => ({
            ...prev,
            [itemId]: value,
        }));
    };

    const goFormData = () => {
        navigate.push('/form'); // Ensure the path is correct
    };

    const subtotal = cartItems.reduce((total, item) => {
        const quantity = quantities[item._id] || item.qty || 1;
        return total + item.price * quantity;
    }, 0);

    return (
        <div className='container mx-auto'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-8 gap-5">
                <div className="col-span-6">
                    <h1 className='uppercase font-bold text-3xl'>Shopping Cart</h1>
                    {cartItems.map((item) => (
                        <div key={item._id} className='mt-6 border p-4'>
                            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-6 gap-7'>
                                <div className='flex justify-center items-center'>
                                    <Image src={item.image} alt={item.name} width={100} height={100} />
                                </div>
                                <div className='flex justify-center items-center'>
                                    <p className='uppercase text-xs'>{item.name}</p>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <p className='uppercase'>${item.price.toFixed(2)}</p>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <select
                                        value={quantities[item._id] || item.qty || 1}
                                        onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                        className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                                    >
                                        {[...Array(item.countInStock)].map((_, index) => (
                                            <option key={`${item._id}-${index + 1}`} value={index + 1}>
                                                {index + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <button onClick={() => removeItems(item._id)} className='uppercase font-bold bg-red-400 hover:bg-red-300 text-white p-2 rounded-md'>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border p-5 col-span-2">
                    <h2 className='uppercase font-bold text-lg'>SubTotal ({cartItems.length}) items</h2>
                    <p className='mt-3'>${subtotal.toFixed(2)}</p>
                    <div className='flex justify-center items-center mt-7'>
                        <button className='bg-black uppercase text-white p-4 text-xs' onClick={goFormData}>Process to checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
