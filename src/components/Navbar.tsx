import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useRouter } from 'next/router'

const Navbar = () => {
    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const checkUser = async () => {
            const { data: session } = await supabase.auth.getSession()
            setUser(session?.user || null)
        }
        checkUser()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setUser(null)
        router.push('/')
    }

    return (
        <nav className="bg-white shadow-md p-4 fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-green-600">Grocery Store</Link>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6">
                    <Link href="/" className="hover:text-green-500">Home</Link>
                    <Link href="/products" className="hover:text-green-500">Products</Link>
                    {user && <Link href="/orders" className="hover:text-green-500">My Orders</Link>}
                </div>

                {/* Auth Buttons */}
                <div>
                    {user ? (
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                    ) : (
                        <div className="space-x-4">
                            <Link href="/src/pages/auth/login.tsx" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
                            <Link href="/src/pages/auth/signup.tsx" className="border border-blue-500 text-blue-500 px-4 py-2 rounded">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
