import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ReportDate from '../Component/ReportDate';
import BranchCode from '../Component/BranchCode';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [branchCode, setBranchCode] = useState('');

  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  };

  const fetchData = async () => {
    const params = {
      branchCode,
      dateFrom: dateFrom ? formatDate(dateFrom) : null,
      dateTo: dateTo ? formatDate(dateTo) : null,
    };

    try {
      const response = await axios.get('/api/dashboard', { params });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  const handleSearch = () => fetchData();
  const handleMainPage = () => navigate('/MainPage');

  useEffect(() => {}, []);

  const rowStyle = "border px-3 py-2";
  const labelStyle =
    "font-semibold text-xs sm:text-sm md:text-base bg-gray-100";

  return (
    <div className="max-w-4xl mx-auto bg-blue-100 p-4 sm:p-6 mt-4 rounded-lg">

      {/* Title */}
      <h2 className="text-center font-bold text-lg sm:text-xl md:text-2xl mb-6">
        Dashboard
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <BranchCode onSelectBranchCode={setBranchCode} />
      </div>

      {/* Date Range */}
      <div className="mb-4">
        <ReportDate
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-xs sm:text-sm md:text-base transition"
        >
          Search
        </button>

        <button
          onClick={handleMainPage}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-xs sm:text-sm md:text-base transition"
        >
          Main Page
        </button>
      </div>

      {/* Summary Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border border-gray-200 text-xs sm:text-sm md:text-base">
          <tbody>
            <tr>
              <th className={`${rowStyle} ${labelStyle}`}>Sale Net Amount</th>
              <td className={rowStyle}>{data[0]?.salenetamount}</td>
            </tr>
            <tr>
              <th className={`${rowStyle} ${labelStyle}`}>Purchase Net Amount</th>
              <td className={rowStyle}>{data[0]?.purchasenetamount}</td>
            </tr>
            <tr>
              <th className={`${rowStyle} ${labelStyle}`}>Sale Return Net Amount</th>
              <td className={rowStyle}>{data[0]?.salereturnnetamount}</td>
            </tr>
            <tr>
              <th className={`${rowStyle} ${labelStyle}`}>
                Purchase Return Net Amount
              </th>
              <td className={rowStyle}>{data[0]?.purchasereturnnetamount}</td>
            </tr>
            <tr>
              <th className={`${rowStyle} ${labelStyle}`}>Receipts</th>
              <td className={rowStyle}>{data[0]?.receipts}</td>
            </tr>
            <tr>
              <th className={`${rowStyle} ${labelStyle}`}>Payments</th>
              <td className={rowStyle}>{data[0]?.payments}</td>
            </tr>
            <tr>
              <th className={`${rowStyle} ${labelStyle}`}>Cash In Hand</th>
              <td className={rowStyle}>{data[0]?.cashinhand}</td>
            </tr>
            <tr>
              <th className={`${rowStyle} ${labelStyle}`}>Expense</th>
              <td className={rowStyle}>{data[0]?.Expence}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
