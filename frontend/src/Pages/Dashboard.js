import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import ReportDate from '../Component/ReportDate';
import BranchCode from '../Component/BranchCode';


const Dashboard = () => {
    const [data, setData] = useState([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
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
        branchCode, 
        dateFrom: dateFrom ? formatDate(dateFrom) : null,
        dateTo: dateTo ? formatDate(dateTo) : null
    };
    
    axios.get('http://localhost:5000/dashboard', { params })
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
                <h2 className="text-center mt-4">Dashboard</h2>
            </div>
            <div className='row'>
                
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
                    <tbody>
                        <tr>
                            <th>Sale Net Amount</th>
                            <td>{data[0]?.salenetamount}</td>
                        </tr>
                        <tr>
                            <th>Purchase Net Amount</th>
                            <td>{data[0]?.purchasenetamount}</td>
                        </tr>
                        <tr>
                            <th>Sale Return Net Amount</th>
                            <td>{data[0]?.salereturnnetamount}</td>
                        </tr>
                        <tr>
                            <th>Purchase Return Net Amount</th>
                            <td>{data[0]?.purchasereturnnetamount}</td>
                        </tr>
                        <tr>
                            <th>Receipts</th>
                            <td>{data[0]?.receipts}</td>
                        </tr>
                        <tr>
                            <th>Payments</th>
                            <td>{data[0]?.payments}</td>
                        </tr>
                        <tr>
                            <th>Cash In Hand</th>
                            <td>{data[0]?.cashinhand}</td>
                        </tr>
                        <tr>
                            <th>Expense</th>
                            <td>{data[0]?.Expence}</td>
                        </tr>
                    </tbody>
            </Table>
   
        </div>
    );
};

export default Dashboard;
