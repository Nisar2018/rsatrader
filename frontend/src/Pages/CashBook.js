import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import AccountSelector from '../Component/AccountSelector';
import ReportDate from '../Component/ReportDate';
import BranchCode from '../Component/BranchCode';



const CashBook = () => {
    const [data, setData] = useState([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [branchCode, setBranchCode] = useState('');
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
        accountNumber, branchCode,
        dateFrom: dateFrom ? formatDate(dateFrom) : null,
        dateTo: dateTo ? formatDate(dateTo) : null
    };
    
    // Log params before making the request
   // console.log("Sending params:", params);
    
    axios.get('http://localhost:5000/cashBook', { params })
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
      
    },[]);

    const handleMainPage = () => {
        
        navigate('/MainPage');
    };

    return (
        <div className="container-sm bg-info mb-3 mt-3">
            <div className="row ">
                <h2 className="text-center mt-4">Cash Book Report</h2>
            </div>
            <div className='row'>
                
                <div className='col'>
                    {/* Using AccountSelector Component */}
                    <AccountSelector onSelectAccount={setAccountNumber} />
                </div>
                <div className='col'>
                    {/* Using BranchCode Component */}
                    <BranchCode onSelectBranchCode={setBranchCode} />
                </div>        
            </div>    
                        
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
                        <th>Remarks</th>
                        <th>Payment</th>
                        <th>Receipt</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td >{formatDate(item.entrydate)}</td>
                            <td>{item.voucherno}</td>
                            <td>{item.Vouchertype}</td>
                            <td>{item.SerialNo}</td>
                            <td>{item.Remarks}</td>
                            <td>{item.payment}</td>
                            <td>{item.receipt}</td>
                            
                        </tr>
                    ))}
                   
                </tbody>
            </Table>
        </div>
    );
};

export default CashBook;
