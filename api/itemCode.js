const express = require('express');
const sql = require('mssql');
const { connectToDatabase } = require('../config');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const pool = await connectToDatabase(1);
        const result = await pool.request().execute('mbItemCodeandName');

        res.json(result.recordset);
    } catch (err) {
       // console.error('Error fetching account codes and names:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;