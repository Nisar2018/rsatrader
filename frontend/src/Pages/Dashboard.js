import React, { useState } from 'react';
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
    if (isNaN(d)) return '';
    return d.toISOString().split('T')[0];
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/dashboard', {
        params: {
          branchCode,
          dateFrom: dateFrom ? formatDate(dateFrom) : null,
          dateTo: dateTo ? formatDate(dateTo) : null,
        },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const summary = data[0] || {};

  const items = [
    { label: 'Sale Net Amount', value: summary.salenetamount },
    { label: 'Purchase Net Amount', value: summary.purchasenetamount },
    { label: 'Sale Return Net Amount', value: summary.salereturnnetamount },
    { label: 'Purchase Return Net Amount', value: summary.purchasereturnnetamount },
    { label: 'Receipts', value: summary.receipts },
    { label: 'Payments', value: summary.payments },
    { label: 'Cash In Hand', value: summary.cashinhand },
    { label: 'Expense', value: summary.Expence },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-blue-100 p-3 sm:p-6 mt-4 rounded-lg">

      {/* Title */}
      <h2 className="text-center font-bold text-lg sm:text-2xl mb-6">
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
          onClick={fetchData}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Search
        </button>

        <button
          onClick={() => navigate('/MainPage')}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Main Page
        </button>
      </div>

      {/* ================= MOBILE VIEW (CARDS) ================= */}
      <div className="space-y-3 sm:hidden">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-lg shadow p-3 flex justify-between"
          >
            <span className="text-xs font-semibold text-gray-600">
              {item.label}
            </span>
            <span className="text-sm font-bold text-gray-800">
              {item.value ?? 0}
            </span>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP VIEW (TABLE) ================= */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border border-gray-200 text-sm">
          <tbody>
            {items.map((item) => (
              <tr key={item.label} className="even:bg-gray-50">
                <th className="border px-4 py-2 text-left font-semibold bg-gray-100">
                  {item.label}
                </th>
                <td className="border px-4 py-2 text-right">
                  {item.value ?? 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;
