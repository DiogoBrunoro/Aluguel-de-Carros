import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não definida no .env");
}

const sql = postgres(process.env.DATABASE_URL, {
  ssl: { rejectUnauthorized: false } // necessário para Supabase
});

export default sql;
