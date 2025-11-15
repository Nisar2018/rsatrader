const express = require('express');
const sql = require('mssql');
const { connectToDatabase } = require('../config');

const router = express.Router();

router.get('/', async (req, res) => {
    
 //   console.log("Received query params:", req.query);

    const { accountNumber, itemType, itemCompany, branchCode, areaName, cityName, salesman, dateFrom, dateTo } = req.query;

  
        try {
        const pool = await connectToDatabase(1);
      
        let parsedDateFrom = dateFrom ? new Date(dateFrom + "T00:00:00.000Z") : null;
        let parsedDateTo = dateTo ? new Date(dateTo + "T00:00:00.000Z") : null;


    // Ensure dates are within the valid SQL SmallDateTime range
    if (parsedDateFrom && parsedDateFrom.getFullYear() < 1900) {
        console.warn("Invalid dateFrom - setting to NULL");
        parsedDateFrom = null;
    }
    if (parsedDateTo && parsedDateTo.getFullYear() < 1900) {
        console.warn("Invalid dateTo - setting to NULL");
        parsedDateTo = null;
    }



        const result = await pool.request()
            .input('AccountNumber', sql.VarChar, accountNumber)
            .input('itemtype', sql.VarChar, itemType)
            .input('itemcompany', sql.VarChar, itemCompany)
            .input('branchcode', sql.VarChar, branchCode)
            .input('areaname', sql.VarChar, areaName)
            .input('cityname', sql.VarChar, cityName)
            .input('salesman', sql.VarChar, salesman)
            .input('dateFrom', sql.SmallDateTime, parsedDateFrom)
            .input('dateto', sql.SmallDateTime, parsedDateTo)
            .execute('mbsalectivityreport');

       // console.log(result.recordset);
            res.json(result.recordset);

    } catch (err) {
       // console.error('Error fetching account ledger report:', err);
       // res.status(500).json({ error: 'Internal server error' });
       //console.error("Error fetching account ledger report:", err.message);
       res.status(500).json({ err: err.message });
       
    }
});

module.exports = router;
