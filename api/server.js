const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./config'); // Assuming connection function is in a separate file

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Import API routes
const loginRoute = require('./api/login');
const accountCodesRoute = require('./api/accountCodes');
const branchCodeRoute = require('./api/branchCode');
const itemCodeRoute = require('./api/itemCode');
const storeCodeRoute = require('./api/storeCode');
const reportdRoute = require('./api/reportd');
const storeLedgerRoute = require('./api/storeLedger');
const areaNameRoute= require('./api/areaName');
const cityNameRoute = require('./api/cityName');
const salesmanRoute = require('./api/salesman');
const customerBalanceRoute = require('./api/customerBalance');
const itemTypeRoute = require('./api/itemType');
const itemCompanyRoute = require('./api/itemCompany');
const itemSummaryRoute = require('./api/itemSummary');
const purchaseActivityRoute = require('./api/purchaseActivity');
const saleActivityRoute= require('./api/saleActivity');
const saleSummaryRoute= require('./api/saleSummary');
const cashBookRoute = require('./api/cashBook');
const accountHeadRoute = require('./api/accountHead');
const accountBalanceRoute = require('./api/accountBalance');
const dashboardRoute = require('./api/dashboard');


// Use API routes
app.use('/login', loginRoute);
app.use('/accountCodes', accountCodesRoute);
app.use('/reportd', reportdRoute);
app.use('/branchCode', branchCodeRoute);
app.use('/itemCode', itemCodeRoute);
app.use('/storeCode', storeCodeRoute);
app.use('/storeLedger', storeLedgerRoute);
app.use('/areaName', areaNameRoute);
app.use('/cityName', cityNameRoute);
app.use('/salesman', salesmanRoute);
app.use('/itemtype', itemTypeRoute);
app.use('/customerBalance', customerBalanceRoute);
app.use('/itemcompany', itemCompanyRoute);
app.use('/itemsummary', itemSummaryRoute);
app.use('/purchaseActivity', purchaseActivityRoute);
app.use('/saleActivity', saleActivityRoute);
app.use('/saleSummary', saleSummaryRoute);
app.use('/cashBook', cashBookRoute);
app.use('/accountHead', accountHeadRoute);
app.use('/accountBalance',accountBalanceRoute);
app.use('./dashboard', dashboardRoute);

app.listen(PORT, () => {
    console.log(`⚙️ Server is running at port: ${PORT}`);
});
