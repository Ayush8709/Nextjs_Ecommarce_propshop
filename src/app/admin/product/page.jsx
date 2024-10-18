'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const Page = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [editUserId, setEditUserId] = useState(null);
    const [editUserData, setEditUserData] = useState({
        name: '',
        brand: '',
        category: '',
        countInStock: '',
        price: '',
        rating: '',
        numReviews: ''
    });
    const [newProductData, setNewProductData] = useState({
        image: '',
        name: '',
        brand: '',
        category: '',
        countInStock: '',
        price: '',
        rating: '',
        numReviews: '',
         description: ''
    });
    const [errorMessage, setErrorMessage] = useState("");

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/admin/product');
            console.log('All products:', data.allProduct);
            setUsers(data.allProduct);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = async (userId) => {
        console.log("Deleting product with ID:", userId);
        try {
            const response = await axios.delete('http://localhost:3000/api/admin/product', { data: { id: userId } });
            console.log('Response:', response.data);
            setUsers(users.filter(user => user._id !== userId));
            setMessage(response.data.message);
        } catch (error) {
            console.log(error);
            setMessage("Error deleting product");
        }
    };

    const handleEditClick = (user) => {
        setEditUserId(user._id);
        setEditUserData({
            name: user.name,
            brand: user.brand,
            category: user.category,
            countInStock: user.countInStock,
            price: user.price,
            rating: user.rating,
            numReviews: user.numReviews
        });
        setErrorMessage(""); // Reset error message on edit
    };

    const validateInputs = () => {
        if (!editUserData.name || !editUserData.brand || !editUserData.category) {
            setErrorMessage("Name, Brand, and Category are required.");
            return false;
        }
        if (isNaN(editUserData.countInStock) || isNaN(editUserData.price) || isNaN(editUserData.rating) || isNaN(editUserData.numReviews)) {
            setErrorMessage("CountInStock, Price, Rating, and NumReviews must be numbers.");
            return false;
        }
        return true;
    };

    const updateUser = async () => {
        if (!validateInputs()) {
            return;
        }

        try {
            await axios.put('http://localhost:3000/api/admin/product', {
                id: editUserId,
                ...editUserData
            });
            setEditUserId(null);
            setEditUserData({
                name: '',
                brand: '',
                category: '',
                countInStock: '',
                price: '',
                rating: '',
                numReviews: '',
               
            });
            fetchUsers();
            setMessage("User updated successfully.");
            setErrorMessage(""); // Clear any error message
        } catch (error) {
            console.log(error);
            setMessage("Error updating product");
        }
    };

    const addProduct = async () => {
        // Validate new product data before submitting
        if (!newProductData.name || !newProductData.brand || !newProductData.category) {
            setErrorMessage("Name, Brand, and Category are required for new products.");
            return;
        }
        if (isNaN(newProductData.countInStock) || isNaN(newProductData.price) || isNaN(newProductData.rating) || isNaN(newProductData.numReviews)) {
            setErrorMessage("CountInStock, Price, Rating, and NumReviews must be numbers.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/admin/product', newProductData);
            setMessage(response.data.message);
            fetchUsers();
            setNewProductData({
                image: '',
                name: '',
                brand: '',
                category: '',
                countInStock: '',
                price: '',
                rating: '',
                numReviews: ''
            });
            setErrorMessage(""); // Clear error message
        } catch (error) {
            console.log(error);
            setMessage("Error adding product");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-4">
            <div className='flex justify-between'>
                <h1 className="text-2xl font-bold mb-4">All Products</h1>
                <button
                    onClick={() => setNewProductData({ ...newProductData, show: !newProductData.show })} // Toggle new product form
                    className="bg-blue-500 text-white font-bold mb-3 py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                    Add New Product
                </button>
            </div>

            {newProductData.show && (
                <div className="mb-4 container mx-auto">
                    <span className='font-bold'>Image: </span>
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={newProductData.image}
                        onChange={(e) => setNewProductData({ ...newProductData, image: e.target.value })}
                        className="border border-gray-300 rounded p-1 mr-2"
                    />
                    <span className='font-bold'>Name: </span>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newProductData.name}
                        onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                        className="border border-gray-300 rounded p-1 mr-2"
                    />
                    <span className='font-bold'>Brand: </span>
                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={newProductData.brand}
                        onChange={(e) => setNewProductData({ ...newProductData, brand: e.target.value })}
                        className="border border-gray-300 rounded p-1 mr-2"
                    />
                    <span className='font-bold'>Category: </span>
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={newProductData.category}
                        onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}
                        className="border border-gray-300 rounded p-1 mr-2"
                    />
                    <br />
                    <span className='font-bold'>countInStock: </span>
                    <input
                        type="number"
                        name="countInStock"
                        placeholder="Count In Stock"
                        value={newProductData.countInStock}
                        onChange={(e) => setNewProductData({ ...newProductData, countInStock: e.target.value })}
                        className="border border-gray-300 rounded p-1 mr-2"
                    />
                    <span className='font-bold'>Price: </span>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={newProductData.price}
                        onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
                        className="border border-gray-300 rounded p-1 mr-2"
                    />
                    <span className='font-bold'>Description: </span>
                    <input
                        type="text"
                        name="description"
                        placeholder="Price"
                        value={newProductData.description}
                        onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                        className="border border-gray-300 rounded p-1 mr-2"
                    />
                    <span className='font-bold'>rating: </span>
                    <input
                        type="number"
                        name="rating"
                        placeholder="Rating"
                        value={newProductData.rating}
                        onChange={(e) => setNewProductData({ ...newProductData, rating: e.target.value })}
                        className="border border-gray-300 rounded p-1 mr-2"
                    />
                    <span className='font-bold'>Reviewe: </span>
                    <input
                        type="number"
                        name="numReviews"
                        placeholder="Number of Reviews"
                        value={newProductData.numReviews}
                        onChange={(e) => setNewProductData({ ...newProductData, numReviews: e.target.value })}
                        className="border border-gray-300 rounded p-1 mr-2"
                    />
                    <button
                        onClick={addProduct}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Add Product
                    </button>
                </div>
            )}

            {message && <p className="mb-4 text-green-500">{message}</p>}
            {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-6">IMAGE</th>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">BRAND</th>
                            <th className="py-3 px-6">CATEGORY</th>
                            <th className="py-3 px-6">COUNTINSTOCK</th>
                            <th className="py-3 px-6">PRICE</th>
                            <th className="py-3 px-6">RATING</th>
                            <th className="py-3 px-6">REVIEWS</th>
                            <th className="py-3 px-6 text-center">ID</th>
                            <th className="py-3 px-6">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {users.map(user => (
                            <tr key={user._id} className="border-b font-bold border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">
                                    <Image src={user.image} height={100} width={100} alt={user.image} />
                                </td>
                                <td className="py-3 px-6">
                                    {editUserId === user._id ? (
                                        <input
                                            type="text"
                                            value={editUserData.name}
                                            onChange={(e) => setEditUserData({ ...editUserData, name: e.target.value })}
                                            className="border border-gray-300 rounded p-1"
                                        />
                                    ) : (
                                        user.name
                                    )}
                                </td>
                                <td className="py-3 px-6">
                                    {editUserId === user._id ? (
                                        <input
                                            type="text"
                                            value={editUserData.brand}
                                            onChange={(e) => setEditUserData({ ...editUserData, brand: e.target.value })}
                                            className="border border-gray-300 rounded p-1"
                                        />
                                    ) : (
                                        user.brand
                                    )}
                                </td>
                                <td className="py-3 px-6">
                                    {editUserId === user._id ? (
                                        <input
                                            type="text"
                                            value={editUserData.category}
                                            onChange={(e) => setEditUserData({ ...editUserData, category: e.target.value })}
                                            className="border border-gray-300 rounded p-1"
                                        />
                                    ) : (
                                        user.category
                                    )}
                                </td>
                                <td className="py-3 px-6">
                                    {editUserId === user._id ? (
                                        <input
                                            type="number"
                                            value={editUserData.countInStock}
                                            onChange={(e) => setEditUserData({ ...editUserData, countInStock: e.target.value })}
                                            className="border border-gray-300 rounded p-1"
                                        />
                                    ) : (
                                        user.countInStock
                                    )}
                                </td>
                                <td className="py-3 px-6">
                                    {editUserId === user._id ? (
                                        <input
                                            type="number"
                                            value={editUserData.price}
                                            onChange={(e) => setEditUserData({ ...editUserData, price: e.target.value })}
                                            className="border border-gray-300 rounded p-1"
                                        />
                                    ) : (
                                        user.price
                                    )}
                                </td>
                                <td className="py-3 px-6">
                                    {editUserId === user._id ? (
                                        <input
                                            type="number"
                                            value={editUserData.rating}
                                            onChange={(e) => setEditUserData({ ...editUserData, rating: e.target.value })}
                                            className="border border-gray-300 rounded p-1"
                                        />
                                    ) : (
                                        user.rating
                                    )}
                                </td>
                                <td className="py-3 px-6">
                                    {editUserId === user._id ? (
                                        <input
                                            type="number"
                                            value={editUserData.numReviews}
                                            onChange={(e) => setEditUserData({ ...editUserData, numReviews: e.target.value })}
                                            className="border border-gray-300 rounded p-1"
                                        />
                                    ) : (
                                        user.numReviews
                                    )}
                                </td>
                                <td className="py-3 px-6">{user._id}</td>
                                <td className="py-3 px-6">
                                    {editUserId === user._id ? (
                                        <button
                                            onClick={updateUser}
                                            className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEditClick(user)}
                                            className="bg-blue-500 text-white px-4 mb-2 py-2 rounded mr-2 hover:bg-blue-600"
                                        >
                                            Update
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="bg-red-500 text-white w-[80px] px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;
