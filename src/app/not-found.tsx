import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
            <div className="text-center">
                <h1 className="text-7xl font-bold text-red-500">404</h1>
                <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
                <p className="text-gray-400 mt-2">
                    Sorry, the page you are looking for doesn’t exist.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}
