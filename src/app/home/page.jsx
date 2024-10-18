'use client';
import React, { useEffect, useState } from 'react';
import Loading from '../loading';
import Link from 'next/link';
import { listProducts } from '@/redux/slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {

    const dispatch = useDispatch()
    
    const allProducts = useSelector(state => state.product);
    const {products, error, loading}= allProducts

    useEffect(()=>{
        dispatch(listProducts())
    },[dispatch])

   

    if (loading) {
        return <div className="text-center"><Loading /></div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className='container mx-auto '>
            <h1 className='text-5xl font-bold mb-6'>Latest Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {!products.myAllData ? (
                    <p className="text-center col-span-full">No products available</p>
                ) : (
                        products.myAllData.map((product) => (
                        <div key={product._id} className="max-w-sm mx-auto p-4">
                            <Link href={`/home/${product._id}`}>
                                <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
                                    <img
                                        className="w-full h-48 object-cover"
                                        src={product.image}
                                        alt={product.title}
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-bold mb-2">{product.title}</h2>
                                        <h3 className="text-lg font-bold mb-2">{product.category}</h3>
                                        <p className="text-gray-700 mb-4">
                                            {product.description.substring(0, 120)}...
                                        </p>
                                        <button
                                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            Buy Now : ₹{product.price}
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Page;
