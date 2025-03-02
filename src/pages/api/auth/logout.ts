import { supabase } from '@/utils/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await supabase.auth.signOut()
    res.status(200).json({ message: 'Logged out' })
}
