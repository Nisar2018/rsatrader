import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import AreaName from '../Component/AreaName';
import BranchCode from '../Component/BranchCode';
import CityName from '../Component/CityName';
import DateS from '../Component/DateS';
import Salesman  from '../Component/Salesman';


const CustomerBalance = () => {
    const [data, setData] = useState([]);
    const [dateTo, setDateTo] = useState('');
    const [areaname, setAreaname] = useState('');
    const [cityname, setCityname] = useState('');
    const [branchCode, setBranchCode] = useState('');
    const [salesman, setSalesman] = useState('');
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
        areaname, branchCode, cityname, salesman,
        dateTo: dateTo ? formatDate(dateTo) : null
    };
    
   
    axios.get('/api/customerBalance', { params })
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
                <h2 className="text-center mt-4">Customer Balance Report</h2>
            </div>
            <div className='row'>
                <div className='col'>
                    {/* Using AreaName Component */}
                    <AreaName onSelectAreaname={setAreaname} />
                </div>
                <div className='col'>
                    
                    {/* Using CityName Component */}
                    <CityName onSelectCityname={setCityname} />
                    
                </div>
                <div className='col'>
                    {/* Using BranchCode Component */}
                    <BranchCode onSelectBranchCode={setBranchCode} />
                </div>
                <div className='col'>
                    {/* Using Salesman Component */}
                    <Salesman onSelectSalesman={setSalesman} />
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
                            <td>{item.customername}</td>
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

export default CustomerBalance;
