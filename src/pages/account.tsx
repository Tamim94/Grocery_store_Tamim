import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";
import Navbar from "@/components/Navbar";

export default function AccountPage() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                setUsername(user.user_metadata?.username || "");
            } else {
                router.push("/login");
            }
        }
        fetchUser();
    }, [router]);

    const handleUpdate = async () => {
        if (!user) return;

        const updates = {
            data: {
                username,
            }
        };

        const { error } = await supabase.auth.updateUser(updates);
        if (error) {
            alert(error.message);
        } else {
            alert("Profile updated successfully");
        }
    };

    const handleChangePassword = async () => {
        if (!password) return;
        const { error } = await supabase.auth.updateUser({ password });
        if (error) {
            alert(error.message);
        } else {
            alert("Password updated successfully");
            setPassword("");
        }
    };

    const handleDeleteAccount = async () => {
        if (!user) return;
        const confirmDelete = confirm("Are you sure you want to delete your account? This action is irreversible.");
        if (confirmDelete) {
            const { error } = await supabase.auth.admin.deleteUser(user.id);
            if (error) {
                alert(error.message);
            } else {
                alert("Account deleted successfully");
                router.push("/");
            }
        }
    };

    return (

        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
<Navbar />
            <h2 className="text-2xl font-semibold mb-4">Account Management</h2>
            {user && (
                <>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-lg"
                        />
                    </div>
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
                    >
                        Update Username
                    </button>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-lg"
                        />
                    </div>
                    <button
                        onClick={handleChangePassword}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4"
                    >
                        Change Password
                    </button>

                    <button
                        onClick={handleDeleteAccount}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                        Delete Account
                    </button>
                </>
            )}
        </div>
    );
}
