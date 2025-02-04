import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';

type User = {
    id: string;
    created_at: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    username: string;
};

const AdminUsers = () => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        const { data, error } = await supabase.from('users').select('*');
        if (error) {
            console.error('Error fetching users:', error);
        } else {
            setUsers(data);
        }
    };

    const handleDeleteUser = async (id: string) => {
        await supabase.from('users').delete().eq('id', id);
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
        const checkAdmin = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/admin/login'); // Redirect if not authenticated
            } else {
                setUser(user);
            }
        };
        checkAdmin();
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                <button
                    onClick={async () => {
                        await supabase.auth.signOut();
                        router.push('/admin/login');
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition duration-300"
                >
                    Logout
                </button>
            </div>

            {/* User List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-3">ID</th>
                            <th className="border p-3">First Name</th>
                            <th className="border p-3">Last Name</th>
                            <th className="border p-3">Email</th>
                            <th className="border p-3">Gender</th>
                            <th className="border p-3">Username</th>
                            <th className="border p-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-100">
                                <td className="border p-3">{user.id}</td>
                                <td className="border p-3">{user.first_name}</td>
                                <td className="border p-3">{user.last_name}</td>
                                <td className="border p-3">{user.email}</td>
                                <td className="border p-3">{user.gender}</td>
                                <td className="border p-3">{user.username}</td>
                                <td className="border p-3">
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
