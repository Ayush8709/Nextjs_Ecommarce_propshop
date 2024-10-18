'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '@/redux/slice/userSlice';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        Cpassword: ''
    });

    const error = useSelector((state) => state.user.error);
    const { loading, userInfo } = useSelector((state) => state.user);

    const [registrationMessage, setRegistrationMessage] = useState('');

    useEffect(() => {
        if (userInfo?.success) {
            setRegistrationMessage('User Already login');
            
        } else if (error) {
            setRegistrationMessage(error);
        }
    }, [userInfo, error, router]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.Cpassword) {
            alert("Passwords do not match");
            return;
        }

        // Dispatch the register action and wait for it to complete
        const resultAction = await dispatch(register(formData));

        // Check if registration was successful
        if (register.fulfilled.match(resultAction)) {
            // User is successfully created
            setRegistrationMessage('Registration successful! Please log in.');
            router.push('/login');
        } else {
            // Handle error if user already exists or other issues
            setRegistrationMessage('User already exists or registration failed.');
        }

        // Clear the form after dispatching
        setFormData({
            name: '',
            email: '',
            password: '',
            Cpassword: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 rounded-lg w-full max-w-lg mx-auto">
            <h2 className="text-4xl font-semibold mb-6 uppercase text-gray-600">Register</h2>

            {registrationMessage && <p className="text-red-600 mb-4">{registrationMessage}</p>} {/* Display messages */}

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-3 p-2 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm focus:ring-opacity-50"
                    placeholder="Email"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-3 p-2 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm focus:ring-opacity-50"
                    placeholder="Password"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="Cpassword">Confirm Password</label>
                <input
                    type="password"
                    id="Cpassword"
                    name="Cpassword"
                    value={formData.Cpassword}
                    onChange={handleChange}
                    className="mt-3 p-2 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm focus:ring-opacity-50"
                    placeholder="Confirm Password"
                    required
                />
            </div>

            <button
                type="submit"
                className="mt-2 bg-black text-white font-semibold p-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
            >
                Register
            </button>
            <p className='mt-3 text-gray-600'>Old Customer? <Link href='/login'>Sign in</Link></p>
        </form>
    );
};

export default RegisterPage;
