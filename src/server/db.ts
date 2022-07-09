import { Pool } from 'pg'

export const DB = new Pool({
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT ?? "5432"),
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_TABLE,
	keepAlive: false
})



