import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useRouter } from 'next/router'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError(error.message)
        } else {
            router.push('/admin') // Redirect to admin panel on success
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
            <p className="mb-4">You can use root@root.com and root as password to login</p>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Login
                </button>
            </form>
        </div>
    )
}

export default AdminLogin
