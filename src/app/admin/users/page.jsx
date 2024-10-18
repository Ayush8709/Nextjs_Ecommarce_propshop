'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Page = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [editUserId, setEditUserId] = useState(null);
    const [editUserData, setEditUserData] = useState({
        name: '',
        email: '',
        isAdmin: false
    });
    const [showAddUser, setShowAddUser] = useState(false);
    const [newUserData, setNewUserData] = useState({
        name: '',
        email: '',
        password: '',
        isAdmin: false
    });

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/admin/users/getuser');
            setUsers(data.allUser);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete('http://localhost:3000/api/admin/users/getuser', { data: { id: userId } });
            setUsers(users.filter(user => user._id !== userId));
            setMessage(response.data.message);
        } catch (error) {
            console.log(error);
            setMessage("Error deleting user");
        }
    };

    const handleEditClick = (user) => {
        setEditUserId(user._id);
        setEditUserData({
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    };

    const handleInputChange = (e) => {
        setEditUserData({
            ...editUserData,
            [e.target.name]: e.target.value
        });
    };

    const handleNewUserInputChange = (e) => {
        setNewUserData({
            ...newUserData,
            [e.target.name]: e.target.value
        });
    };

    const updateUser = async () => {
        try {
            await axios.put('http://localhost:3000/api/admin/users/getuser', { id: editUserId, ...editUserData });
            setEditUserId(null);
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const addUser = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/admin/users/getuser', newUserData);
            setMessage(response.data.message);
            fetchUsers();
            setShowAddUser(false);
            setNewUserData({ name: '', email: '', password: '', isAdmin: false }); // reset the form
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-4">
            <div className='flex justify-between'>
                <h1 className="text-2xl font-bold mb-4">All Users</h1>
                <button
                    onClick={() => setShowAddUser(!showAddUser)}
                    className="bg-blue-500 text-white font-bold mb-3 py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                    Add New User
                </button>
            </div>

            {showAddUser && (
                <div className="mb-4 container mx-auto">
                    <span className='font-bold'>Name: </span>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newUserData.name}
                        onChange={handleNewUserInputChange}
                        className="border border-gray-300 rounded p-1 mr-2"
                    />
                    <span className='font-bold'>Email: </span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={newUserData.email}
                        onChange={handleNewUserInputChange}
                        className="border border-gray-300 rounded p-1 mr-2"
                    />
                    <span className='font-bold'>Password: </span>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={newUserData.password}
                        onChange={handleNewUserInputChange}
                        className="border border-gray-300 rounded p-1 mr-2"
                    />
                    <span className='font-bold'>Admin: </span>
                    <select
                        name="isAdmin"
                        value={newUserData.isAdmin}
                        onChange={handleNewUserInputChange}
                        className="border border-gray-300 rounded p-1 mr-2"
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    <button
                        onClick={addUser}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Add User
                    </button>
                </div>
            )}

            {message && <p className="mb-4 text-green-500">{message}</p>}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">ADMIN</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {users.map(user => (
                            <tr key={user._id} className="border-b font-bold border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">{user._id}</td>
                                <td className="py-3 px-6">
                                    {editUserId === user._id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editUserData.name}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded p-1"
                                        />
                                    ) : (
                                        user.name
                                    )}
                                </td>
                                <td className="py-3 px-6">
                                    {editUserId === user._id ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={editUserData.email}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded p-1"
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td className="py-3 px-6">
                                    {editUserId === user._id ? (
                                        <select
                                            name="isAdmin"
                                            value={editUserData.isAdmin}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded p-1"
                                        >
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                    ) : (
                                        (user.isAdmin ? "Yes" : "No")
                                    )}
                                </td>
                                <td className="py-3 px-6">
                                    {editUserId === user._id ? (
                                        <button
                                            onClick={() => updateUser(user._id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEditClick(user)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                                        >
                                            Update
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
