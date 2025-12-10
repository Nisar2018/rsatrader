const express = require('express');
const sql = require('mssql');
// Assuming the config.js file is still one directory up from this new routes file
const { connectToDatabase } = require('./config'); 

const router = express.Router();

// -------------------------------------------------------------------
// 1. LOGIN ROUTE: Original functionality from Login.js
// Path: /login 
// -------------------------------------------------------------------
router.get('/login', async (req, res) => {
    try {
        const pool = await connectToDatabase(req.query.Database);
        const result = await pool.request()
            .input('UserName', sql.VarChar, req.query.UserName)
            .input('Passward', sql.VarChar, req.query.Passward)
            .query('SELECT * FROM TblUser WHERE UserName = @UserName AND Passward = @Passward');
            
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

// -------------------------------------------------------------------
// 2. DASHBOARD ROUTE: Original functionality from dashboard.js
// Path: /dashboard
// -------------------------------------------------------------------
router.get('/dashboard', async (req, res) => {
    const { branchCode, dateFrom, dateTo } = req.query;

    try {
        // NOTE: The original code used connectToDatabase(1)
        const pool = await connectToDatabase(1); 
    
        let parsedDateFrom = dateFrom ? new Date(dateFrom + "T00:00:00.000Z") : null;
        let parsedDateTo = dateTo ? new Date(dateTo + "T00:00:00.000Z") : null;

        // Ensure dates are within the valid SQL SmallDateTime range
        if (parsedDateFrom && parsedDateFrom.getFullYear() < 1900) {
            //console.warn("Invalid dateFrom - setting to NULL");
            parsedDateFrom = null;
        }
        if (parsedDateTo && parsedDateTo.getFullYear() < 1900) {
            //console.warn("Invalid dateTo - setting to NULL");
            parsedDateTo = null;
        }

        const result = await pool.request()
            .input('branchcode', sql.VarChar, branchCode)
            .input('dateFrom', sql.SmallDateTime, parsedDateFrom)
            .input('dateto', sql.SmallDateTime, parsedDateTo)
            .execute('mbdashboard');

        res.json(result.recordset);

    } catch (err) {
        //console.error("Error fetching dashboard report:", err.message);
        res.status(500).json({ err: err.message });
    }
});
// -------------------------------------------------------------------
// 12. reportd ROUTE: Original functionality from reportd.js
// Path: /reportd
// -------------------------------------------------------------------
router.get('/Reportd', async (req, res) => {
    
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

// -------------------------------------------------------------------
// 3. cashBook ROUTE: Original functionality from CashBook.js
// Path: /cashbook
// -------------------------------------------------------------------
router.get('/cashbook', async (req, res) => {
    
 //   console.log("Received query params:", req.query);

    const { accountNumber, branchCode, dateFrom, dateTo } = req.query;

  
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
            .input('branchcode', sql.VarChar, branchCode)
            .input('dateFrom', sql.SmallDateTime, parsedDateFrom)
            .input('dateTo', sql.SmallDateTime, parsedDateTo)
            .execute('mbcashbookReport');

        
            res.json(result.recordset);

    } catch (err) {
      
       res.status(500).json({ err: err.message });
       
    }
});
// -------------------------------------------------------------------
// 4. CityName ROUTE: Original functionality from cityName.js
// Path: /cityname
// -------------------------------------------------------------------

router.get('/cityname', async (req, res) => {
    try {
        const pool = await connectToDatabase(1);
        const result = await pool.request().execute('mbcity');

        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching account codes and names:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// -------------------------------------------------------------------
// 5. CustomerBalance ROUTE: Original functionality from customerBalance.js
// Path: /customerbalance
// -------------------------------------------------------------------
router.get('/customerBalance', async (req, res) => {    
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
// -------------------------------------------------------------------
// 6. itemCode ROUTE: Original functionality from itemCode.js
// Path: /itemcode
// -------------------------------------------------------------------
router.get('/itemcode', async (req, res) => {
    try {
        const pool = await connectToDatabase(1);
        const result = await pool.request().execute('mbItemCodeandName');

        res.json(result.recordset);
    } catch (err) {
       // console.error('Error fetching account codes and names:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// -------------------------------------------------------------------
// 8. itemCompany ROUTE: Original functionality from itemCompany.js
// Path: /itemcompany
// -------------------------------------------------------------------
router.get('/itemcompany', async (req, res) => {
    try {
        const pool = await connectToDatabase(1);
        const result = await pool.request().execute('mbitemcompany');

        res.json(result.recordset);
    } catch (err) {
      //  console.error('Error fetching account codes and names:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// -------------------------------------------------------------------
// 9. itemSummary ROUTE: Original functionality from itemSummary.js
// Path: /itemsummary
// -------------------------------------------------------------------
router.get('/itemsummary', async (req, res) => {
    
   // console.log("Received query params:", req.query);

    const { itemtype, branchCode, itemcompany, storecode, dateTo } = req.query;

           try {
        const pool = await connectToDatabase(1);
      
       let parsedDateTo = dateTo ? new Date(dateTo + "T00:00:00.000Z") : null;

    // Ensure dates are within the valid SQL SmallDateTime range
       
    if (parsedDateTo && parsedDateTo.getFullYear() < 1900) {
       // console.warn("Invalid dateTo - setting to NULL");
        parsedDateTo = null;
    }

        const result = await pool.request()
            .input('itemtype', sql.VarChar, itemtype)
            .input('branchcode', sql.VarChar, branchCode)
            .input('itemcompany', sql.VarChar, itemcompany)
            .input('storecode', sql.VarChar, storecode)
            .input('dateto', sql.SmallDateTime, parsedDateTo)
            .execute('mbitemsummaryreport');
      
            //  console.log(result.recordset)
        res.json(result.recordset);

    } catch (err) {
       // console.error('Error fetching account ledger report:', err);
       // res.status(500).json({ error: 'Internal server error' });
       //console.error("Error fetching account ledger report:", err.message);
       res.status(500).json({ err: err.message });
       
    }
});
// -------------------------------------------------------------------
// 10. itemType ROUTE: Original functionality from itemType.js
// Path: /itemtype
// -------------------------------------------------------------------
router.get('/itemtype', async (req, res) => {
    try {
        const pool = await connectToDatabase(1);
        const result = await pool.request().execute('mbitemtype');

        res.json(result.recordset);
    } catch (err) {
       // console.error('Error fetching account codes and names:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// -------------------------------------------------------------------
// 11. purchaseActivity ROUTE: Original functionality from purchaseActivity.js
// Path: /purchaseactivity
// -------------------------------------------------------------------
router.get('/purchaseActivity', async (req, res) => {
    
 //   console.log("Received query params:", req.query);

    const { accountNumber, itemType, itemCompany, branchCode, dateFrom, dateTo } = req.query;

  
        try {
        const pool = await connectToDatabase(1);
      
        let parsedDateFrom = dateFrom ? new Date(dateFrom + "T00:00:00.000Z") : null;
        let parsedDateTo = dateTo ? new Date(dateTo + "T00:00:00.000Z") : null;


    // Ensure dates are within the valid SQL SmallDateTime range
    if (parsedDateFrom && parsedDateFrom.getFullYear() < 1900) {
       // console.warn("Invalid dateFrom - setting to NULL");
        parsedDateFrom = null;
    }
    if (parsedDateTo && parsedDateTo.getFullYear() < 1900) {
      //  console.warn("Invalid dateTo - setting to NULL");
        parsedDateTo = null;
    }



        const result = await pool.request()
            .input('AccountNumber', sql.VarChar, accountNumber)
            .input('itemtype', sql.VarChar, itemType)
            .input('itemcompany', sql.VarChar, itemCompany)
            .input('branchcode', sql.VarChar, branchCode)
            .input('dateFrom', sql.SmallDateTime, parsedDateFrom)
            .input('dateto', sql.SmallDateTime, parsedDateTo)
            .execute('mbpurchaseactivityreport');

        console.log(result.recordset);
            res.json(result.recordset);

    } catch (err) {
       // console.error('Error fetching account ledger report:', err);
       // res.status(500).json({ error: 'Internal server error' });
       //console.error("Error fetching account ledger report:", err.message);
       res.status(500).json({ err: err.message });
       
    }
});

// -------------------------------------------------------------------
// 13. saleActivity ROUTE: Original functionality from saleActivity.js
// Path: /saleactivity
// -------------------------------------------------------------------
router.get('/saleActivity', async (req, res) => {
    
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

// -------------------------------------------------------------------
// 14. salesman ROUTE: Original functionality from salesman.js
// Path: /salesman
// -------------------------------------------------------------------
router.get('/salesman', async (req, res) => {
    try {
        const pool = await connectToDatabase(1);
        const result = await pool.request().execute('mbsalesman');
      
        res.json(result.recordset);
    } catch (err) {
      //  console.error('Error fetching account codes and names:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// -------------------------------------------------------------------
// 15. saleSummary ROUTE: Original functionality from saleSummary.js
// Path: /salesummary
// -------------------------------------------------------------------
router.get('/saleSummary', async (req, res) => {
    
 //   console.log("Received query params:", req.query);

    const { cityName, itemType, itemCompany, branchCode, areaName, salesman, dateFrom, dateTo } = req.query;

  
        try {
        const pool = await connectToDatabase(1);
      
        let parsedDateFrom = dateFrom ? new Date(dateFrom + "T00:00:00.000Z") : null;
        let parsedDateTo = dateTo ? new Date(dateTo + "T00:00:00.000Z") : null;


    // Ensure dates are within the valid SQL SmallDateTime range
    if (parsedDateFrom && parsedDateFrom.getFullYear() < 1900) {
       // console.warn("Invalid dateFrom - setting to NULL");
        parsedDateFrom = null;
    }
    if (parsedDateTo && parsedDateTo.getFullYear() < 1900) {
       // console.warn("Invalid dateTo - setting to NULL");
        parsedDateTo = null;
    }



        const result = await pool.request()
            .input('cityname', sql.VarChar, cityName)
            .input('itemtype', sql.VarChar, itemType)
            .input('itemcompany', sql.VarChar, itemCompany)
            .input('branchcode', sql.VarChar, branchCode)
            .input('areaname', sql.VarChar, areaName)
            .input('salesman', sql.VarChar, salesman)
            .input('dateFrom', sql.SmallDateTime, parsedDateFrom)
            .input('dateto', sql.SmallDateTime, parsedDateTo)
            .execute('mbsaleitemwisesummaryreport');

        res.json(result.recordset);

    } catch (err) {
       // console.error('Error fetching account ledger report:', err);
       // res.status(500).json({ error: 'Internal server error' });
       //console.error("Error fetching account ledger report:", err.message);
       res.status(500).json({ err: err.message });
       
    }
});
// -------------------------------------------------------------------
// 16. storeCode ROUTE: Original functionality from storeCode.js
// Path: /storecode
// -------------------------------------------------------------------
router.get('/storecode', async (req, res) => {
    try {
        const pool = await connectToDatabase(1);
        const result = await pool.request().execute('mbStore');

        res.json(result.recordset);
    } catch (err) {
       // console.error('Error fetching account codes and names:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// -------------------------------------------------------------------
// 17. storeLedger ROUTE: Original functionality from storeLedger.js
// Path: /storeledger
// -------------------------------------------------------------------
router.get('/storeLedger', async (req, res) => {
    
    const { itemCode,branchCode,storeCode, dateFrom, dateTo } = req.query;
        try {
        const pool = await connectToDatabase(1);
      
        let parsedDateFrom = dateFrom ? new Date(dateFrom + "T00:00:00.000Z") : null;
        let parsedDateTo = dateTo ? new Date(dateTo + "T00:00:00.000Z") : null;

    // Ensure dates are within the valid SQL SmallDateTime range
    if (parsedDateFrom && parsedDateFrom.getFullYear() < 1900) {
       // console.warn("Invalid dateFrom - setting to NULL");
        parsedDateFrom = null;
    }
    if (parsedDateTo && parsedDateTo.getFullYear() < 1900) {
       // console.warn("Invalid dateTo - setting to NULL");
        parsedDateTo = null;
    }

        const result = await pool.request()
            .input('itemcode', sql.VarChar, itemCode)
            .input('branchcode', sql.VarChar, branchCode)
            .input('storecode', sql.VarChar, storeCode)
            .input('dateFrom', sql.SmallDateTime, parsedDateFrom)
            .input('dateTo', sql.SmallDateTime, parsedDateTo)
            .execute('mbStoreLedgerReport');

        res.json(result.recordset);

    } catch (err) {
     
       res.status(500).json({ err: err.message });
       
    }
});
// -------------------------------------------------------------------
// 18. accountBalance ROUTE: Original functionality from accountBalance.js
// Path: /accountbalance
// -------------------------------------------------------------------
router.get('/accountBalance', async (req, res) => {
    
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
// -------------------------------------------------------------------
// 19. accountCode ROUTE: Original functionality from accountCode.js
// Path: /accountcode
// -------------------------------------------------------------------
router.get('/accountcode', async (req, res) => {
    try {
        const pool = await connectToDatabase(1);
        const result = await pool.request().execute('mbAccounCodeandName');

        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching account codes and names:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// -------------------------------------------------------------------
// 20. accountHead ROUTE: Original functionality from accountHead.js
// Path: /accounthead
// -------------------------------------------------------------------
router.get('/accounthead', async (req, res) => {
    try {
        const pool = await connectToDatabase(1);
        const result = await pool.request().execute('mbaccouncodeandnameonlyhead');

        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching account codes and names:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// -------------------------------------------------------------------
// 21. areaName: Original functionality from areaName.js
// Path: /areaname
// -------------------------------------------------------------------
router.get('/areaname', async (req, res) => {
    try {
        const pool = await connectToDatabase(1);
        const result = await pool.request().execute('mbarea');
      
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching account codes and names:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// -------------------------------------------------------------------
// 22. branchCode: Original functionality from branchCode.js
// Path: /branchcode
// -------------------------------------------------------------------
router.get('/branchcode', async (req, res) => {
    try {
        const pool = await connectToDatabase(1);
        const result = await pool.request().execute('mbBranch');

        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching account codes and names:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Add all other consolidated routes here...

// Export the single consolidated router
module.exports = router;