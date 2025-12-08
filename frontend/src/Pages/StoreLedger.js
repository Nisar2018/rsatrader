import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import ItemCode from '../Component/ItemCode';
import BranchCode from '../Component/BranchCode';
import StoreCode from '../Component/StoreCode';
import ReportDate from '../Component/ReportDate';


const StoreLedger = () => {
    const [data, setData] = useState([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [storeCode, setStoreCode] = useState('');
    const [branchCode, setBranchCode] = useState('');
    const navigate = useNavigate();

    const formatDate = (date) => {
               
        if (!date) return null;
        const d = new Date(date);
        if (isNaN(d.getTime())) return null; // Ensure valid date   
       
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    const fetchData = async () => {
        
        
       const params = {
        itemCode, branchCode, storeCode,
        dateFrom: dateFrom ? formatDate(dateFrom) : null,
        dateTo: dateTo ? formatDate(dateTo) : null
    };
    
    
    axios.get('/api/storeLedger', { params })
        .then(response => {
            console.log("Response:", response.data);
            setData(response.data);
        })
        .catch(error => {
            console.error("Error fetching report:", error);
        });
    };

    const handleSearch = () => {
        fetchData();
    };

    useEffect(() => {
      //  fetchData();
    },[]);

    const handleMainPage = () => {
        
        navigate('/MainPage');
    };

    // Calculate totals for debit and credit amounts
    const totalDebit = data.reduce((acc, item) => acc + (item.quantityin || 0), 0);
    const totalCredit = data.reduce((acc, item) => acc + (item.quantityout || 0), 0);


    return (
        <div className="container-sm bg-info mb-3 mt-3">
            <div className="row ">
                <h2 className="text-center mt-4">Store Ledger Report</h2>
            </div>
            <div className='row'>
                <div className='col'>
                    {/* Using ItemCode Component */}
                    <ItemCode onSelectItemCode={setItemCode} />
                </div>
                <div className='col'>
                    {/* Using BranchCode Component */}
                    <BranchCode onSelectBranchCode={setBranchCode} />
                </div>
                <div className='col'>
                    {/* Using StoreCode Component */}
                    <StoreCode onSelectStoreCode={setStoreCode} />
                </div>
            
            </div>
            <div className='row'>
                <div className='col'>
                    {/* Using ReportDate Component */}
                    <ReportDate dateFrom={dateFrom} setDateFrom={setDateFrom} dateTo={dateTo} setDateTo={setDateTo} />    
                </div>    
            </div>     
                       
            <button type="button" className="btn btn-primary mb-3" onClick={handleSearch}>Search</button>
            <button type="button" className="btn btn-primary mb-3" onClick={handleMainPage}>Main Page</button>
            
            <Table responsive striped bordered>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>V No</th>
                        <th>V Type</th>
                        <th>Sr No</th>
                        <th>Quantity In</th>
                        <th>Quantity Out</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td >{formatDate(item.entrydate)}</td>
                            <td>{item.voucherno}</td>
                            <td>{item.vouchertype}</td>
                            <td>{item.serialno}</td>
                            <td>{item.quantityin}</td>
                            <td>{item.quantityout}</td> 
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="4"><strong>Totals</strong></td>
                        <td><strong>{totalDebit}</strong></td>
                        <td><strong>{totalCredit}</strong></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="4"><strong>Balance</strong></td>
                        <td></td>
                        <td><strong>{totalDebit-totalCredit}</strong></td>
                        
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default StoreLedger;
