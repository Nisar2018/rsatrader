const express = require('express');
const sql = require('mssql');
const { connectToDatabase } = require('../config');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const pool = await connectToDatabase(req.query.Database);
        const result = await pool.request()
            .input('UserName', sql.VarChar, req.query.UserName)
            .input('Passward', sql.VarChar, req.query.Passward)
            .query('SELECT * FROM TblUser WHERE UserName = @UserName AND Passward = @Passward');
        //console.log(result.recordset);
        if (result.recordset.length > 0) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
       // console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
    
});

module.exports = router;
