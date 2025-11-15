import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import AccountSelector from '../Component/AccountSelector';
import ReportDate from '../Component/ReportDate';


const Reportd = () => {
    const [data, setData] = useState([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
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
        accountNumber,
        dateFrom: dateFrom ? formatDate(dateFrom) : null,
        dateTo: dateTo ? formatDate(dateTo) : null
    };
    
    
    axios.get('http://localhost:5000/reportd', { params })
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
    const totalDebit = data.reduce((acc, item) => acc + (item.DebitAmount || 0), 0);
    const totalCredit = data.reduce((acc, item) => acc + (item.CreditAmount || 0), 0);


    return (
        <div className="container-sm bg-info mb-3 mt-3">
            <div className="row ">
                <h2 className="text-center mt-4">Account Ledger Report</h2>
            </div>

            {/* Using AccountSelector Component */}
            <AccountSelector onSelectAccount={setAccountNumber} />
            
            {/* Using ReportDate Component */}
            <ReportDate dateFrom={dateFrom} setDateFrom={setDateFrom} dateTo={dateTo} setDateTo={setDateTo} />
          
            <button type="button" className="btn btn-primary mb-3" onClick={handleSearch}>Search</button>
            <button type="button" className="btn btn-primary mb-3" onClick={handleMainPage}>Main Page</button>
            <Table responsive striped bordered>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>V No</th>
                        <th>V Type</th>
                        <th>Sr No</th>
                        <th>Desc</th>
                        <th>Debit Amount</th>
                        <th>Credit Amount</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td >{formatDate(item.EntryDate)}</td>
                            <td>{item.voucherno}</td>
                            <td>{item.Vouchertype}</td>
                            <td>{item.SerialNo}</td>
                            <td>{item.Remarks}</td>
                            <td>{item.DebitAmount}</td>
                            <td>{item.CreditAmount}</td> 
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="5"><strong>Totals</strong></td>
                        <td><strong>{totalDebit}</strong></td>
                        <td><strong>{totalCredit}</strong></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="5"><strong>Balance</strong></td>
                        <td></td>
                        <td><strong>{totalDebit-totalCredit}</strong></td>
                        
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default Reportd;
