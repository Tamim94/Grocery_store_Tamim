import { supabase } from '@/utils/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { data, error } = await supabase.from('products').select('*')

        if (error) {
            return res.status(500).json({ error: error.message })
        }

        return res.status(200).json(data)
    }



    if (req.method === 'POST') {
        const { name, description, price, stock, image_url, category } = req.body

        try {
            const { data, error } = await supabase
                .from('products')
                .insert([{ name, description, price, stock, image_url, category }])

            if (error) {
                console.error('Supabase Insert Error:', error.message)
                return res.status(500).json({ error: error.message })
            }

            return res.status(201).json(data)
        } catch (error) {
            console.error('Unexpected Server Error:', error)
            return res.status(500).json({ error: 'Unexpected server error occurred.' })
        }
    }


    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
}
