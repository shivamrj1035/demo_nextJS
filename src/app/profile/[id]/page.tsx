"use client";


import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";

export default function UserProfilePage() {
    const params = useParams();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
                <h1 className="text-2xl font-semibold">User Profile</h1>
                <p className="text-gray-400 mt-2">User ID: {params.id}</p>
            <Link href={`/`}><p className="w-full bg-blue-600 hover:bg-blue-700 mt-6 py-3 rounded-lg text-white font-semibold transition">Back</p></Link>
            </div>
        </div>
    );
}
