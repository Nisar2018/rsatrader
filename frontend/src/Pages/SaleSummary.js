import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ReportDate from '../Component/ReportDate';
import ItemType from '../Component/ItemType';
import ItemCompany from '../Component/ItemCompany';
import BranchCode from '../Component/BranchCode';
import AreaName from '../Component/AreaName';
import Salesman from '../Component/Salesman';
import CityName from '../Component/CityName';

const SaleSummary = () => {
    const [data, setData] = useState([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [itemType, setItemType] = useState('');
    const [areaName, setAreaName] = useState('');
    const [itemCompany, setItemCompany] = useState('');
    const [branchCode, setBranchCode] = useState('');
    const [cityName, setCityName] = useState('');
    const [salesman, setSalesman] = useState('');
    const navigate = useNavigate();

    const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        if (isNaN(d.getTime())) return null;
        return d.toISOString().split('T')[0];
    };

    const fetchData = () => {
        const params = {
            cityName,
            itemType,
            itemCompany,
            branchCode,
            areaName,
            salesman,
            dateFrom: dateFrom ? formatDate(dateFrom) : null,
            dateTo: dateTo ? formatDate(dateTo) : null
        };

        axios.get('/api/saleSummary', { params })
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    };

    return (
        <div className="max-w-7xl mx-auto bg-sky-100 rounded-lg p-4 mt-4 text-xs sm:text-sm md:text-base">

            {/* Title */}
            <h2 className="text-center font-bold text-base sm:text-lg md:text-xl mb-4">
                Sale Summary Report
            </h2>

            {/* Filters Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <CityName onSelectCityname={setCityName} />
                <BranchCode onSelectBranchCode={setBranchCode} />
                <AreaName onSelectAreaname={setAreaName} />
            </div>

            {/* Filters Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                <ItemType onSelectitemtype={setItemType} />
                <ItemCompany onSelectitemcompany={setItemCompany} />
                <Salesman onSelectSalesman={setSalesman} />
            </div>

            {/* Date */}
            <div className="mt-4">
                <ReportDate
                    dateFrom={dateFrom}
                    setDateFrom={setDateFrom}
                    dateTo={dateTo}
                    setDateTo={setDateTo}
                />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
                <button
                    onClick={fetchData}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs sm:text-sm"
                >
                    Search
                </button>

                <button
                    onClick={() => navigate('/MainPage')}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-xs sm:text-sm"
                >
                    Main Page
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-5">
                <table className="w-full border border-gray-300 text-left text-xs sm:text-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            {[
                                'Item Code',
                                'Item Name',
                                'Quantity',
                                'Purchase Rate',
                                'Gross Amount',
                                'Discount Amount',
                                'Net Amount'
                            ].map((head) => (
                                <th key={head} className="border px-2 py-1 whitespace-nowrap">
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border px-2 py-1">{item.itemcode}</td>
                                <td className="border px-2 py-1">{item.itemname}</td>
                                <td className="border px-2 py-1">{item.quantity}</td>
                                <td className="border px-2 py-1">{item.purchaserate}</td>
                                <td className="border px-2 py-1">{item.grossamount}</td>
                                <td className="border px-2 py-1">{item.discountamount}</td>
                                <td className="border px-2 py-1">{item.netamount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default SaleSummary;
