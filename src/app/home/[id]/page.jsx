'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '@/redux/slice/cartSlice';
import { listSingleProduct } from '@/redux/slice/productSlice';

const Page = ({ params }) => {
    const id = params.id;
    const [qty, setQty] = useState(1); // Default quantity set to 1
    const dispatch = useDispatch();
    const singleList = useSelector(state => state.product);
    const { singleProductDetails, error, loading } = singleList;

    const getData = useSelector(state => state.cart)
    

    useEffect(() => {
        dispatch(listSingleProduct(id));
    }, [dispatch, id]);

    const addToCartHandler = () => {
        // Dispatch action to add item to cart
        dispatch(addItemToCart({ product: singleProductDetails, qty }));
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className='container mx-auto'>
            <section className='ml-5'>
                <Link href='/' passHref>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                        <span>Go Back</span>
                    </button>
                </Link>
            </section>

            <section>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 mt-5 p-5 gap-5'>
                    <div className='md:col-span-2'>
                        {singleProductDetails?.image ? (
                            <Image
                                src={singleProductDetails.image}
                                width={600}
                                height={500}
                                alt={singleProductDetails?.name || 'Product image'}
                                priority
                            />
                        ) : (
                            <div className="text-center">Image not available</div>
                        )}
                    </div>
                    <div>
                        <h2 className="font-semibold text-3xl uppercase mb-3">{singleProductDetails?.name}</h2>
                        <hr />
                        <div className="my-4">
                            <p className="text-gray-600"><span>Rating:</span> {singleProductDetails?.rating} reviews</p>
                        </div>
                        <hr />
                        <div className="my-4">
                            <p className="text-gray-600"><span>Price:</span> {singleProductDetails?.price}$</p>
                        </div>
                        <hr />
                        <div className="my-4">
                            <p className="text-gray-600">{singleProductDetails?.description}</p>
                        </div>
                    </div>
                    <div>
                        <div className='rounded-md p-2'>
                            <div className='flex justify-between border py-2 px-4'>
                                <p>Price</p>
                                <p>{singleProductDetails.price}$</p>
                            </div>
                            <div className='flex justify-between border py-2 px-4'>
                                <p>Stock</p>
                                <p>{singleProductDetails.countInStock > 0 ? singleProductDetails.countInStock : 'Out of stock'}</p>
                            </div>

                            {singleProductDetails.countInStock > 0 && (
                                <div className='flex justify-between border py-2 px-4'>
                                    <p className='mt-5'>Qty</p>
                                    <p>
                                        <select
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                            className="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                                        >
                                            {[...Array(singleProductDetails.countInStock)].map((_, index) => (
                                                <option key={index + 1} value={index + 1}>
                                                    {index + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </p>
                                </div>
                            )}

                            <div className='flex justify-center items-center border py-2 px-4'>
                                <button onClick={addToCartHandler} className="bg-black text-white hover:bg-gray-800 font-bold py-2 px-4 rounded w-full">
                                    <span>Add to cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Page;
