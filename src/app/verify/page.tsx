"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyEmail = async () => {
        try {
            await axios.post("/api/users/verify", { token });
            setVerified(true);
        } catch (err) {
            setError(true);
        }
    };

    useEffect(() => {
        const tokenFromUrl = new URLSearchParams(window.location.search).get("token");
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        } else {
            setError(true);
        }
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
                {verified ? (
                    <div>
                        <h1 className="text-2xl font-semibold text-green-500">Email Verified!</h1>
                        <p className="mt-2 text-gray-300">Your email has been successfully verified.</p>
                        <Link href="/login" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-lg font-semibold transition">
                            Go to Login
                        </Link>
                    </div>
                ) : error ? (
                    <div>
                        <h1 className="text-2xl font-semibold text-red-500">Verification Failed</h1>
                        <p className="mt-2 text-gray-300">An error occurred while verifying your email.</p>
                    </div>
                ) : (
                    <p className="text-gray-300">Verifying your email...</p>
                )}
            </div>
        </div>
    );
}
