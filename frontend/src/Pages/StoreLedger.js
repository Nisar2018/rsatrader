import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        if (isNaN(d.getTime())) return null;
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
                setData(response.data);
            })
            .catch(error => {
                console.error("Error fetching report:", error);
            });
    };

    const handleSearch = () => fetchData();
    const handleMainPage = () => navigate('/MainPage');

    const totalDebit = data.reduce((acc, item) => acc + (item.quantityin || 0), 0);
    const totalCredit = data.reduce((acc, item) => acc + (item.quantityout || 0), 0);

    return (
        <div className="max-w-7xl mx-auto p-4 bg-blue-100 rounded-lg mt-4 mb-4">
            <h2 className="text-center text-2xl sm:text-xl md:text-3xl font-semibold mb-6">Store Ledger Report</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <ItemCode onSelectItemCode={setItemCode} />
                <BranchCode onSelectBranchCode={setBranchCode} />
                <StoreCode onSelectStoreCode={setStoreCode} />
            </div>

            <div className="mb-4">
                <ReportDate 
                    dateFrom={dateFrom} setDateFrom={setDateFrom} 
                    dateTo={dateTo} setDateTo={setDateTo} 
                />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <button 
                    onClick={handleSearch} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition text-sm sm:text-base"
                >
                    Search
                </button>
                <button 
                    onClick={handleMainPage} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition text-sm sm:text-base"
                >
                    Main Page
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm sm:text-base md:text-lg">
                    <thead className="bg-blue-200">
                        <tr>
                            <th className="border px-2 py-1">Date</th>
                            <th className="border px-2 py-1">V No</th>
                            <th className="border px-2 py-1">V Type</th>
                            <th className="border px-2 py-1">Sr No</th>
                            <th className="border px-2 py-1">Quantity In</th>
                            <th className="border px-2 py-1">Quantity Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="hover:bg-blue-50">
                                <td className="border px-2 py-1">{formatDate(item.entrydate)}</td>
                                <td className="border px-2 py-1">{item.voucherno}</td>
                                <td className="border px-2 py-1">{item.vouchertype}</td>
                                <td className="border px-2 py-1">{item.serialno}</td>
                                <td className="border px-2 py-1">{item.quantityin}</td>
                                <td className="border px-2 py-1">{item.quantityout}</td>
                            </tr>
                        ))}
                        <tr className="font-semibold bg-blue-50">
                            <td colSpan="4" className="border px-2 py-1">Totals</td>
                            <td className="border px-2 py-1">{totalDebit}</td>
                            <td className="border px-2 py-1">{totalCredit}</td>
                        </tr>
                        <tr className="font-semibold bg-blue-50">
                            <td colSpan="4" className="border px-2 py-1">Balance</td>
                            <td className="border px-2 py-1"></td>
                            <td className="border px-2 py-1">{totalDebit - totalCredit}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StoreLedger;
