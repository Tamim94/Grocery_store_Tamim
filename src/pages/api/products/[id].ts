import { supabase } from '@/utils/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query

    if (req.method === 'PATCH') {
        const { name, description, price, stock, image_url } = req.body
        const { data, error } = await supabase
            .from('products')
            .update({ name, description, price, stock, image_url })
            .eq('id', id)
        if (error) return res.status(500).json({ error: error.message })
        return res.status(200).json(data)
    }

    if (req.method === 'DELETE') {
        const { error } = await supabase.from('products').delete().eq('id', id)
        if (error) return res.status(500).json({ error: error.message })
        return res.status(204).end()
    }

    res.setHeader('Allow', ['PATCH', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
}
