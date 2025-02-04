import { supabase } from '@/utils/supabaseClient'

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

    const { email, password, first_name, last_name, gender, username } = req.body

    // Sign up the user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) return res.status(400).json({ error: error.message })

    // Insert additional user info in the users table
    const { error: dbError } = await supabase
        .from('users')
        .insert([{ id: data.user.id, first_name, last_name, gender, username, email }])

    if (dbError) return res.status(400).json({ error: dbError.message })

    res.status(200).json({ user: data.user })
}
