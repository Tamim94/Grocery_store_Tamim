import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push("/login");
    };

    return (
        <div className="relative">
            {user ? (
                // Logged-in state
                <div
                    className="relative"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <button
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition"
                        onClick={() => router.push("/account")}
                    >
                        <span>{user.user_metadata.username || "Profile"}</span>
                        <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full text-lg font-semibold">
                            {user.user_metadata.username
                                ? user.user_metadata.username[0].toUpperCase()
                                : "P"}
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div
                            className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-4"
                        >
                            <p className="text-gray-800 font-semibold">{user.user_metadata.username}</p>
                            <p className="text-gray-500 text-sm">{user.email}</p>
                            <hr className="my-2" />
                            <button
                                onClick={() => router.push("/account")}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                Manage Account
                            </button>
                            <button
                                onClick={handleLogout}
                                className="text-red-600 hover:underline text-sm mt-2 block"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                // Not logged in state
                <button
                    onClick={() => router.push("/login")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                >
                    Sign In
                </button>
            )}
        </div>
    );
};

export default UserProfile;
