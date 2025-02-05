import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';

const UserManagement = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchUsers = async () => {
        const { data, error } = await supabase
            .from('users')
            .select('id, email, username');

        if (error) console.error('Error fetching users:', error);
        else setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpdate = async (id: number) => {
        const { error } = await supabase.from('users').update(editingUser).eq('id', id);
        if (error) console.error('Error updating user:', error);
        else {
            setUsers(users.map(u => (u.id === id ? editingUser : u)));
            setEditingUser(null);
        }
    };

    const handleDelete = async (id: number) => {
        const { error } = await supabase.from('users').delete().eq('id', id);
        if (error) console.error('Error deleting user:', error);
        else setUsers(users.filter(u => u.id !== id));
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
            <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border p-2 mb-4 w-full"
            />
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border p-3">Name</th>
                    <th className="border p-3">Email</th>
                    <th className="border p-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-100">
                        {editingUser?.id === user.id ? (
                            <>
                                <td><input type="text" value={editingUser.username} onChange={e => setEditingUser({ ...editingUser, username: e.target.value })}/></td>
                                <td><input type="email" value={editingUser.email} onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}/></td>
                                <td>
                                    <button onClick={() => handleUpdate(user.id)} className="p-2 bg-blue-500 text-white rounded">Save</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="border p-3">{user.username}</td>
                                <td className="border p-3">{user.email}</td>
                                <td>
                                    <button onClick={() => setEditingUser(user)} className="p-2 bg-yellow-500 text-white rounded mr-2">Edit</button>
                                    <button onClick={() => handleDelete(user.id)} className="p-2 bg-red-500 text-white rounded">Delete</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
