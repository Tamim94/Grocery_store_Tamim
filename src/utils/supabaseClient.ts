import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
export const signup = async (req, res) => {
    const { email, password, first_name, last_name, gender, username } = req.body;
    const { user, error } = await supabase.auth.signUp({
        email,
        password,
    }, {
        data: { first_name, last_name, gender, username }
    });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'User registered. Please check your email to confirm.' });
};
export const supabase = createClient(supabaseUrl, supabaseAnonKey)


