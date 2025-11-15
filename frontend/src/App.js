// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import Logout from './Logout';
import MainPage from './Pages/MainPage';  // Import the new component
import Reportd from './Pages/Reportd';
import StoreLedger from './Pages/StoreLedger';
import CustomerBalance from './Pages/CustomerBalance';
import ItemSummary from './Pages/ItemSummary';
import PurchaseActivity from './Pages/PurchaseActivity';
import SaleActivity from './Pages/SaleActivity';
import CashBook from './Pages/CashBook';
import SaleSummary from './Pages/SaleSummary';
import AccountBalance from './Pages/Accountbalance';
import Dashboard from './Pages/Dashboard';

const App = () => {
   
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LoginForm />}/>
                <Route path='/logout' element={<Logout />} />
                <Route path='/MainPage' element={<MainPage />} />
                <Route path='/reportd' element={<Reportd />} />
                <Route path='/storeledger' element={<StoreLedger/>} />
                <Route path='/customerbalance' element={<CustomerBalance/>} />
                <Route path='/itemsummary' element={<ItemSummary/>} />
                <Route path='/purchaseactivity' element={<PurchaseActivity/>} />
                <Route path='/saleactivity' element={<SaleActivity/>} />
                <Route path='/saleSummary' element={<SaleSummary/>} />
                <Route path='/cashBook' element={<CashBook/>} />
                <Route path='/accountBalance' element={<AccountBalance/>} />
                <Route path='/dashboard' element={<Dashboard/>} />

             </Routes>
        </Router>
    );
}   
    export default App;
