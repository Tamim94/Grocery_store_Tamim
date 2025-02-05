import { useState } from "react";
import { useRouter } from "next/router";
import UserProfile from "./Userprofile"; // Import the UserProfile component

const Navbar = () => {
    const router = useRouter();

    // Navigation links
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "About", path: "/About" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <div
                    className="text-2xl font-bold text-blue-600 cursor-pointer"
                    onClick={() => router.push("/")}
                >
                    Tamim Grocery Store
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            className={`text-gray-700 hover:text-blue-600 transition duration-300 ${
                                router.pathname === link.path ? "font-semibold" : ""
                            }`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* User Profile and Auth Button */}
                <div className="flex items-center space-x-4">
                    <UserProfile />

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
