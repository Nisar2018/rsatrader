import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import ItemType from '../Component/ItemType';
import BranchCode from '../Component/BranchCode';
import DateS from '../Component/DateS';
import StoreCode  from '../Component/StoreCode';
import ItemCompany from '../Component/ItemCompany';

const ItemSummery = () => {
    const [data, setData] = useState([]);
    const [dateTo, setDateTo] = useState('');
    const [itemtype, setItemtype] = useState('');
    const [itemcompany, setItemcompany] = useState('');
    const [branchCode, setBranchCode] = useState('');
    const [storecode, setstorecode] = useState('');
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
        itemtype, branchCode, itemcompany, storecode,
        dateTo: dateTo ? formatDate(dateTo) : null
    };
    
    
    axios.get('/api/itemSummary', { params })
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
                <h2 className="text-center mt-4">Item Summary Report</h2>
            </div>
            <div className='row'>
                <div className='col'>
                    {/* Using Item Type Component */}
                    <ItemType onSelectitemtype={setItemtype} />
                </div>
                <div className='col'>
                    
                    {/* Using Itemcompany Component */}
                    <ItemCompany onSelectitemcompany={setItemcompany} />
                    
                </div>
                <div className='col'>
                    {/* Using BranchCode Component */}
                    <BranchCode onSelectBranchCode={setBranchCode} />
                </div>
                <div className='col'>
                    {/* Using Salesman Component */}
                    <StoreCode onSelectStoreCode={setstorecode} />
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
                        <th>Item Code</th>
                        <th>Item Name</th>
                        <th>Quantity In</th>
                        <th>Quantity Out</th>
                        <th>Balance</th>
                        
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                           
                            <td>{item.itemcode}</td>
                            <td>{item.itemname}</td>
                            <td>{item.quantityin}</td>
                            <td>{item.quantityout}</td>
                            <td>{item.balancequantity}</td> 
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ItemSummery;
