import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
    user: 'yitzchak',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
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
