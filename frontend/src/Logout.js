import React, { useEffect } from 'react';

const Logout = () => {

    const handleLogout = () => {
        localStorage.clear(); // Clear localStorage
        sessionStorage.clear(); // Clear sessionStorage
        window.location.href = '/'; // Redirect immediately
    };

    // Automatic logout after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            handleLogout();
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl sm:text-xl md:text-3xl font-semibold text-gray-800 mb-4 text-center">
                Logging out...
            </h1>
            <p className="text-base sm:text-sm md:text-lg text-gray-600 text-center mb-6">
                You will be redirected to the login page shortly.
            </p>
            <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition text-sm sm:text-base md:text-lg"
            >
                Logout Now
            </button>
        </div>
    );
};

export default Logout;
