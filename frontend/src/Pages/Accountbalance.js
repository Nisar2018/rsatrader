import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import BranchCode from '../Component/BranchCode';
import DateS from '../Component/DateS';
import AccountHead from '../Component/AccountHead';

const AccountBalance = () => {
    const [data, setData] = useState([]);
    const [dateTo, setDateTo] = useState('');
    const [accountHead, setAccountHead] = useState('');
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
        accountHead, branchCode, 
        dateTo: dateTo ? formatDate(dateTo) : null
    };
    
    axios.get('/api/accountBalance', { params })
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
                <h2 className="text-center mt-4">Account Balance Report</h2>
            </div>
            <div className='row'>
                <div className='col'>
                    {/* Using AreaName Component */}
                    <AccountHead onSelectAccountHead={setAccountHead} />
                </div>
                <div className='col'>
                    {/* Using BranchCode Component */}
                    <BranchCode onSelectBranchCode={setBranchCode} />
                </div>
                            
            </div>
            <div className='row'>
                <div className='col'>
                    {/* Using ReportDate Component */}
                    <DateS dateTo={dateTo} setDateTo={setDateTo} />    
                </div>    
            </div>     
                       
            <button type="button" className="btn btn-primary mb-3" onClick={handleSearch}>Search</button>
            <button type="button" className="btn btn-primary mb-3" onClick={handleMainPage}>Main Page</button>
            
            <Table responsive striped bordered>
                <thead>
                    <tr>
                        <th>Account Code</th>
                        <th>Customer Name</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Balance</th>
                        
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                           
                            <td>{item.accountcode}</td>
                            <td>{item.accountname}</td>
                            <td>{item.debitamount}</td>
                            <td>{item.creditamount}</td>
                            <td>{item.balance}</td> 
                        </tr>
                    ))}
                                    
                </tbody>
            </Table>
        </div>
    );
};

export default AccountBalance;
