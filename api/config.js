//Configuration for MSSQL server

const sql = require('mssql');

const config = {
    user: "sa",
    password: "A@Zmet@l!!123",
    server: "182.191.79.96",  
    database: "Garments",
    options: {
        encrypt: false,
        connectTimeout: 30000 // Increase timeout to 30 seconds
    },
};

async function connectToDatabase(db) {
    try {
        if (db !=1) 
        { 
            config.database=db
        };

        const pool = new sql.ConnectionPool(config);
        await pool.connect();
        return pool;
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error; // Re-throw the error for handling at the calling point
    }
}


module.exports = { connectToDatabase };
