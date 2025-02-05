import { useState } from 'react'
import { useRouter } from 'next/router'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const router = useRouter()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })

        const data = await res.json()
        if (res.ok) {
            router.push('/') // Redirect to home
        } else {
            setError(data.error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
            </form>
        </div>
    )
}

export default Login
