const express = require('express');
const sql = require('mssql');
const { connectToDatabase } = require('../config');
const router = express.Router();

router.get('/', async (req, res) => {    
    const { areaname, branchCode, cityname, salesman, dateTo } = req.query;

        try {
        const pool = await connectToDatabase(1);
      
       let parsedDateTo = dateTo ? new Date(dateTo + "T00:00:00.000Z") : null;

    // Ensure dates are within the valid SQL SmallDateTime range
    
    if (parsedDateTo && parsedDateTo.getFullYear() < 1900) {
        console.warn("Invalid dateTo - setting to NULL");
        parsedDateTo = null;
    }

        const result = await pool.request()
            .input('areaname', sql.VarChar, areaname)
            .input('branchcode', sql.VarChar, branchCode)
            .input('cityname', sql.VarChar, cityname)
            .input('salesman', sql.VarChar, salesman)
            .input('dateto', sql.SmallDateTime, parsedDateTo)
            .execute('mbcustomerbalancesummaryreport');
      //  console.log(result.recordset)
        res.json(result.recordset);

    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;
