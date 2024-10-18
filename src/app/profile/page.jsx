'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [formData, setFormData] = useState({});

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/auth/me');
            setFormData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value // Update specific input field
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Show confirmation dialog
        const confirmed = window.confirm("Are you sure you want to update your information?");
        if (!confirmed) {
            return; // Exit if the user clicked "Cancel"
        }

        try {
            const response = await axios.put("http://localhost:3000/api/auth/update", {
                id: formData._id,
                name: formData.name,
                email: formData.email,
            });
            console.log('User updated:', response.data);
            window.location.reload()
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className="p-8 rounded-lg w-full max-w-lg mx-auto">
                <h2 className="text-4xl font-semibold mb-6 uppercase text-gray-600">User Profile</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name || ''} // Bind state to input value
                        onChange={handleChange} // Update state on change
                        className="mt-3 p-2 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm focus:ring-opacity-50"
                        placeholder="Name"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ''} // Bind state to input value
                        onChange={handleChange} // Update state on change
                        className="mt-3 p-2 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm focus:ring-opacity-50"
                        placeholder='Email'
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="mt-2 bg-black text-white font-semibold p-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default Page;
