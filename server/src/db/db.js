import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();



const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


async function createTable() {
    try {
        // התחברות למסד הנתונים
        await pool.connect();
        console.log("Connected to the database!");
        
        // שאילתת SQL ליצירת הטבלה
        const query = `
        CREATE TABLE IF NOT EXISTS images (
            id TEXT PRIMARY KEY,
            image_url TEXT NOT NULL,
            category VARCHAR(50) NOT NULL,
            created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            `;
            
      await pool.query(query);
      console.log("Table 'images' created successfully!");
    } catch (error) {
      console.error("Error creating table:", error.message);
    } finally {
      await pool.end();
      console.log("Disconnected from the database!");
    }
}

// createTable();


export default pool;
