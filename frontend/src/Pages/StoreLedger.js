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
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    };

    const fetchData = () => {
        axios.get('/api/storeLedger', {
            params: {
                itemCode,
                branchCode,
                storeCode,
                dateFrom: dateFrom ? formatDate(dateFrom) : null,
                dateTo: dateTo ? formatDate(dateTo) : null,
            }
        })
        .then(res => setData(res.data))
        .catch(err => console.error(err));
    };

    const totalDebit = data.reduce((a, b) => a + (b.quantityin || 0), 0);
    const totalCredit = data.reduce((a, b) => a + (b.quantityout || 0), 0);

    return (
        <div className="max-w-7xl mx-auto p-3 sm:p-4 bg-blue-100 rounded-lg mt-4 mb-4">

            {/* Title */}
            <h2 className="text-center font-semibold text-base sm:text-xl md:text-2xl mb-4">
                Store Ledger Report
            </h2>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                <ItemCode onSelectItemCode={setItemCode} />
                <BranchCode onSelectBranchCode={setBranchCode} />
                <StoreCode onSelectStoreCode={setStoreCode} />
            </div>

            {/* Dates */}
            <div className="mb-4">
                <ReportDate
                    dateFrom={dateFrom}
                    setDateFrom={setDateFrom}
                    dateTo={dateTo}
                    setDateTo={setDateTo}
                />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
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

            {/* Responsive Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white">
                <table className="min-w-[700px] w-full text-xs sm:text-sm">
                    <thead className="bg-blue-200 sticky top-0 z-10">
                        <tr>
                            {[
                                'Date',
                                'V No',
                                'V Type',
                                'Sr No',
                                'Qty In',
                                'Qty Out'
                            ].map(h => (
                                <th
                                    key={h}
                                    className="border px-2 py-2 text-left whitespace-nowrap"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, i) => (
                            <tr key={i} className="hover:bg-blue-50">
                                <td className="border px-2 py-1 whitespace-nowrap">
                                    {formatDate(item.entrydate)}
                                </td>
                                <td className="border px-2 py-1 whitespace-nowrap">
                                    {item.voucherno}
                                </td>
                                <td className="border px-2 py-1 whitespace-nowrap">
                                    {item.vouchertype}
                                </td>
                                <td className="border px-2 py-1 whitespace-nowrap">
                                    {item.serialno}
                                </td>
                                <td className="border px-2 py-1 text-right">
                                    {item.quantityin}
                                </td>
                                <td className="border px-2 py-1 text-right">
                                    {item.quantityout}
                                </td>
                            </tr>
                        ))}

                        {/* Totals */}
                        <tr className="font-semibold bg-blue-50">
                            <td colSpan="4" className="border px-2 py-1">
                                Totals
                            </td>
                            <td className="border px-2 py-1 text-right">
                                {totalDebit}
                            </td>
                            <td className="border px-2 py-1 text-right">
                                {totalCredit}
                            </td>
                        </tr>

                        {/* Balance */}
                        <tr className="font-semibold bg-blue-50">
                            <td colSpan="5" className="border px-2 py-1">
                                Balance
                            </td>
                            <td className="border px-2 py-1 text-right">
                                {totalDebit - totalCredit}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Mobile hint */}
            <p className="text-xs text-gray-600 mt-2 sm:hidden">
                👉 Swipe left/right to view full table
            </p>

        </div>
    );
};

export default StoreLedger;
