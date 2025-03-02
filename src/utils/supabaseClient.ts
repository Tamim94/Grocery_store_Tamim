import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signup = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password, first_name, last_name, gender, username } = req.body;

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { first_name, last_name, gender, username }, // Additional user metadata
        },
    });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    // Check if the user was created successfully
    if (data.user) {
        return res.status(201).json({ message: 'User registered. Please check your email to confirm.' });
    } else {
        return res.status(500).json({ error: 'User registration failed.' });
    }
};
