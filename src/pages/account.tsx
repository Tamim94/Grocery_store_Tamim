import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";

const AccountPage = () => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                setUsername(user.user_metadata?.username || "");
            } else {
                router.push("/login");
            }
        };
        fetchUser();
    }, [router]);

    const updateUsername = async () => {
        if (!username.trim()) return;
        setLoading(true);
        const { error } = await supabase.auth.updateUser({
            data: { username },
        });
        setLoading(false);
        if (error) alert(error.message);
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Manage Account</h1>
            {user ? (
                <>
                    <p className="mb-2 text-gray-600">Email: {user.email}</p>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Username</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button
                            onClick={updateUsername}
                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Username"}
                        </button>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
                    >
                        Sign Out
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AccountPage;
