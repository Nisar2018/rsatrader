const express = require('express');
const sql = require('mssql');
const { connectToDatabase } = require('../config');

const router = express.Router();

router.get('/', async (req, res) => {
    
   // console.log("Received query params:", req.query);

    const { accountHead, branchCode, dateTo } = req.query;

        try {
        const pool = await connectToDatabase(1);
      
       let parsedDateTo = dateTo ? new Date(dateTo + "T00:00:00.000Z") : null;

    // Ensure dates are within the valid SQL SmallDateTime range
    
    
    if (parsedDateTo && parsedDateTo.getFullYear() < 1900) {
        console.warn("Invalid dateTo - setting to NULL");
        parsedDateTo = null;
    }

        const result = await pool.request()
            .input('accounthead', sql.VarChar, accountHead)
            .input('branchcode', sql.VarChar, branchCode)
            .input('dateto', sql.SmallDateTime, parsedDateTo)
            .execute('mbaccountbalancesummaryreport');
        console.log(result.recordset)
        res.json(result.recordset);

    } catch (err) {
       
       res.status(500).json({ err: err.message });
       
    }
});

module.exports = router;
