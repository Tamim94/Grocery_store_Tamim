import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';
import ProductManagement from '@/components/ProductManagement';
import UserManagement from '@/components/UserManagement';

const AdminDashboard = () => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'products' | 'users'>('products');

    useEffect(() => {
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
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
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

            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`px-6 py-2 rounded-lg transition duration-300 ${
                        activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    Products
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    className={`px-6 py-2 rounded-lg transition duration-300 ${
                        activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    Users
                </button>
            </div>

            {/* Content Area */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                {activeTab === 'products' ? <ProductManagement /> : <UserManagement />}
            </div>
        </div>
    );
};

export default AdminDashboard;
