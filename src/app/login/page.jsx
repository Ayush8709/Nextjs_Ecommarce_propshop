'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/slice/userSlice';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const error = useSelector((state) => state.user.error);
    const { loading, userInfo } = useSelector((state) => state.user);

    const [loginMessage, setLoginMessage] = useState('');

    useEffect(() => {
        if (error) {
            setLoginMessage(error);
        }
    }, [error]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginMessage(''); // Reset message

        // Dispatch the login action
        const resultAction = await dispatch(login(formData));

        // Handle login success and error cases
        if (login.fulfilled.match(resultAction)) {
            // Login successful
            setLoginMessage('Login successful! Redirecting to home page...');
            router.push('/'); // Redirect to home page
            window.location.reload()
        } else {
            // Handle error
            setLoginMessage('Login failed. Please check your credentials.');
        }

        // Clear the form
        setFormData({
            email: '',
            password: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 rounded-lg w-full max-w-lg mx-auto">
            <h2 className="text-4xl font-semibold mb-6 uppercase text-gray-600">Sign In</h2>

            {loginMessage && <p className="text-red-600 mb-4">{loginMessage}</p>} {/* Display messages */}

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

            <button
                type="submit"
                className="mt-2 bg-black text-white font-semibold p-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
            >
                Continue
            </button>
            <p className='mt-3 text-gray-600'>New Customer? <Link href='/register'>Register</Link></p>
        </form>
    );
};

export default LoginForm;
