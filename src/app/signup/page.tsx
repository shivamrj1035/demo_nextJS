"use client";
import Link from 'next/link';
import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [buttonDisable, setButtonDisable] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState({
        email: "",
        username: "",
        password: "",
    });

    useEffect(()=> {
        if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
          setButtonDisable(false);
        }else{
            setButtonDisable(true);
        }
    }, [user])

    const onSignup = async () => {
        try {
            setLoading(true);
            const res = await axios.post('/api/users/signup', user);
            toast.success('Signup successful!');
            console.log('created', res.data)
            router.push('/login');
        }catch (e : any){
            console.log('Error',e.message);
            toast.error('Error', e.message);
        }finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-6">
            {
                loading ?
                    <div className="text-white text-3xl">Loading...</div>
                    :
                    <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                        <h1 className="text-center text-3xl font-semibold mb-6">Sign Up</h1>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
                                <input
                                    type="text" id="username"
                                    value={user.username}
                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                                    placeholder="Enter username"
                                    className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-500"
                                />
                            </div>

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
                                <input
                                    type="password" id="password"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    placeholder="Enter password"
                                    className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <button
                            onClick={onSignup}
                            disabled={buttonDisable}
                            className="w-full bg-blue-600 hover:bg-blue-700 mt-6 py-3 rounded-lg text-white font-semibold transition"
                        >
                            {buttonDisable ? "Fill he details" : "Sign Up"}
                        </button>

                        <p className="text-gray-400 text-center mt-4">
                            Already have an account?
                            <Link href="/login" className="text-blue-400 hover:text-blue-300 ml-1">Login</Link>
                        </p>
                    </div>
            }
        </div>
    );
}
