'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const App = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const checkAuth = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/auth/me');
            const { data } = response.data;

            if (data) {
                setIsAuthenticated(!!data.email);
                setUserEmail(data.email || '');
                setIsAdmin(data.isAdmin || false);
            }
        } catch (error) {
            console.log(error.message);
            setIsAuthenticated(false);
            setUserEmail('');
            setIsAdmin(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:3000/api/auth/logout');
            setIsAuthenticated(false);
            setUserEmail('');
            setIsAdmin(false);
            router.push('/login');
        } catch (error) {
            console.log(error.message);
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setUserDropdownOpen(false);
        setAdminDropdownOpen(false);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <Link href="/" onClick={closeMenu} className="text-2xl font-bold text-white">MyShopMe</Link>
                </div>
                <div className={`menu-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <ul className={`nav-list ${isOpen ? 'active' : ''}`}>
                    <li><Link href="/" onClick={closeMenu} className="nav-link">Home</Link></li>
                    {!isAuthenticated ? (
                        <li><Link href="/login" onClick={closeMenu} className="nav-link">Login</Link></li>
                    ) : (
                        <>
                            <li><Link href="/cart" onClick={closeMenu} className="nav-link">Cart</Link></li>
                            <li className="relative">
                                <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="nav-link rounded">
                                    User: {userEmail}
                                </button>
                                {userDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-black text-white shadow-lg rounded-md">
                                        <Link href="/profile" className="block px-4 py-2 hover:bg-gray-700" onClick={closeMenu}>Profile</Link>
                                        <Link href="/setting" className="block px-4 py-2 hover:bg-gray-700" onClick={closeMenu}>Settings</Link>
                                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-700" onClick={() => { handleLogout(); closeMenu(); }}>Logout</button>
                                    </div>
                                )}
                            </li>
                        </>
                    )}
                    {isAdmin && (
                        <li className="relative">
                            <button onClick={() => setAdminDropdownOpen(!adminDropdownOpen)} className="nav-link rounded">
                                Admin: {userEmail}
                            </button>
                            {adminDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-black text-white shadow-lg rounded-md">
                                    <Link href="/admin/users" className="block px-4 py-2 hover:bg-gray-700" onClick={closeMenu}>User </Link>
                                    <Link href="/admin/product" className="block px-4 py-2 hover:bg-gray-700" onClick={closeMenu}>Product</Link>
                                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-700" onClick={() => { handleLogout(); closeMenu(); }}>Logout</button>
                                </div>
                            )}
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default App;
