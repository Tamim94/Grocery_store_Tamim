import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import UserProfile from "./Userprofile"; // Import the UserProfile component

const Navbar = () => {
    const router = useRouter();
    const session = useSession();
    const supabase = useSupabaseClient();
    const user = session?.user;

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

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
                    {user ? (
                        <>
                            <UserProfile />
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => router.push("/admin/login")}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => router.push("/signup")}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 transition"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
