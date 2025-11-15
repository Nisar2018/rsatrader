import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import AccountSelector from '../Component/AccountSelector';
import ReportDate from '../Component/ReportDate';
import ItemType from '../Component/ItemType';
import ItemCompany from '../Component/ItemCompany';
import BranchCode from '../Component/BranchCode';
import AreaName from '../Component/AreaName';
import CityName from '../Component/CityName';
import Saleman from '../Component/Salesman';


const SaleActivity = () => {
    const [data, setData] = useState([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [areaName, setAreaName] = useState('');
    const [cityName, setCityName] = useState('');
    const [itemType, setItemType] = useState('');
    const [itemCompany, setItemCompany] = useState('');
    const [branchCode, setBranchCode] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
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
        accountNumber, itemType, itemCompany, branchCode, areaName, cityName, salesman,
        dateFrom: dateFrom ? formatDate(dateFrom) : null,
        dateTo: dateTo ? formatDate(dateTo) : null
    };
    
    
    axios.get('http://localhost:5000/saleActivity', { params })
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

 
    return (
        <div className="container-sm bg-info mb-3 mt-3">
            <div className="row ">
                <h2 className="text-center mt-4">Sale Activity Report</h2>
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
                <div className='col'>
                    {/* Using Item Type Component */}
                    <ItemType onSelectitemtype={setItemType} />
                
                </div>
                
                <div className='col'>
                  
                    {/* Using Itemcompany Component */}
                    <ItemCompany onSelectitemcompany={setItemCompany} />
                    
                </div>
            </div>
            <div className='row'>
                
                <div className='col'>
                    {/* Using AreaName Component */}
                    <AreaName onSelectAreaname={setAreaName} />
                </div>
                <div className='col'>
                    {/* Using CityName Component */}
                    <CityName onSelectCityname={setCityName} />
                    
                </div>
                <div className='col'>
                    {/* Using Item Type Component */}
                    <Saleman onSelectSalesman={setSalesman} />
                
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
                        <th>vendor Name</th>
                        <th>Sr No</th>
                        <th>Item code</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Purchaser Rate</th>
                        <th>Gross Amount</th>
                        <th>Discount Amount</th>
                        <th>Net Amount</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td >{formatDate(item.entrydate)}</td>
                            <td>{item.voucherno}</td>
                            <td>{item.vendorname}</td>
                            <td>{item.serialno}</td>
                            <td>{item.itemcode}</td>
                            <td>{item.itemname}</td>
                            <td>{item.quantity}</td>
                            <td>{item.purchaserate}</td> 
                            <td>{item.grossamount}</td> 
                            <td>{item.discountamount}</td> 
                            <td>{item.netamount}</td> 
                        
                        </tr>
                    ))}
                
                </tbody>
            </Table>
        </div>
    );
};

export default SaleActivity;
