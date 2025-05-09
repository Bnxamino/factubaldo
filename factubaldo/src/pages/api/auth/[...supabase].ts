import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      const { email, password } = req.body;
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) return res.status(401).json({ error: error.message });
      return res.status(200).json({ user });

    case 'DELETE':
      const { access_token } = req.body;
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) return res.status(401).json({ error: signOutError.message });
      return res.status(200).json({ message: 'Signed out successfully' });

    default:
      res.setHeader('Allow', ['POST', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}