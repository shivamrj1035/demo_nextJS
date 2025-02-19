"use client";

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [buttonDisable, setButtonDisable] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const onLogin = async () => {
        try {
            setLoading(true);
            const res = await axios.post('/api/users/login', user);
            toast.success('Login successful!');
            router.push('/');
        } catch (e: any) {
            console.log('Error is there', e);
            toast.error(`Error : ${e.response.data.error}`);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-6">
            <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-center text-3xl font-semibold mb-6">Login</h1>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="text" id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Enter email"
                            className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                placeholder="Enter password"
                                className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-500 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                            >
                                {showPassword ? "🙉" : "🙈"}
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onLogin}
                    disabled={buttonDisable}
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-6 py-3 rounded-lg text-white font-semibold transition"
                >
                    {buttonDisable ? "Please fill up data" : "Login"}
                </button>

                <p className="text-gray-400 text-center mt-4">
                    new user?
                    <Link href="/signup" className="text-blue-400 hover:text-blue-300 ml-1">signup</Link>
                </p>
            </div>
        </div>
    );
}
