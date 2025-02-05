import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '', password: '', first_name: '', last_name: '', gender: '', username: ''
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const { error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
        }, {
            data: {
                first_name: formData.first_name,
                last_name: formData.last_name,
                gender: formData.gender,
                username: formData.username,
            }
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input name="first_name" placeholder="First Name" onChange={handleChange} className="border p-2" />
                <input name="last_name" placeholder="Last Name" onChange={handleChange} className="border p-2" />
                <input name="username" placeholder="Username" onChange={handleChange} className="border p-2" />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2" />
                <select name="gender" onChange={handleChange} className="border p-2">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;