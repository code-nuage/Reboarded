import pool from "../config/db.ts";

export interface User = {
  id: string,
  username: string,
  email: string,
  password_hash: string,
  avatar_url: string | null,
  bio: string | null,
  created_at: Date,
  updated_at: Date
}

export async function register() {
  
}
