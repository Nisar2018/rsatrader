const express = require('express');
const sql = require('mssql');
const { connectToDatabase } = require('../config');

const router = express.Router();

router.get('/', async (req, res) => {
    
 //   console.log("Received query params:", req.query);

    const { accountNumber, dateFrom, dateTo } = req.query;

   // console.log("Raw dateFrom from frontend:", req.query.dateFrom);
  //  console.log("Raw dateTo from frontend:", req.query.dateTo);
  //  console.log("Received dateFrom:", dateFrom);
  //  console.log("Received dateTo:", dateTo);

        try {
        const pool = await connectToDatabase(1);
      
        let parsedDateFrom = dateFrom ? new Date(dateFrom + "T00:00:00.000Z") : null;
        let parsedDateTo = dateTo ? new Date(dateTo + "T00:00:00.000Z") : null;


    // Ensure dates are within the valid SQL SmallDateTime range
    if (parsedDateFrom && parsedDateFrom.getFullYear() < 1900) {
     //   console.warn("Invalid dateFrom - setting to NULL");
        parsedDateFrom = null;
    }
    if (parsedDateTo && parsedDateTo.getFullYear() < 1900) {
     //   console.warn("Invalid dateTo - setting to NULL");
        parsedDateTo = null;
    }



        const result = await pool.request()
            .input('AccountNumber', sql.VarChar, accountNumber)
            .input('dateFrom', sql.SmallDateTime, parsedDateFrom)
            .input('dateTo', sql.SmallDateTime, parsedDateTo)
            .execute('mbAccounLedgerReport');

        res.json(result.recordset);

    } catch (err) {
       // console.error('Error fetching account ledger report:', err);
       // res.status(500).json({ error: 'Internal server error' });
       //console.error("Error fetching account ledger report:", err.message);
       res.status(500).json({ err: err.message });
       
    }
});

module.exports = router;
