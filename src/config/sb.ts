import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.SB_URL || !process.env.SB_ANON_KEY) {
  console.error('❌ Faltan variables de entorno para Supabase.');
  process.exit(1);
}

const supabase = createClient(
  process.env.SB_URL,
  process.env.SB_ANON_KEY
);

export default supabase;