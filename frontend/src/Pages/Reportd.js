import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AccountSelector from '../Component/AccountSelector';
import ReportDate from '../Component/ReportDate';

const Reportd = () => {
  const [data, setData] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d)) return '';
    return d.toISOString().split('T')[0];
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/Reportd', {
        params: {
          accountNumber,
          dateFrom: dateFrom ? formatDate(dateFrom) : null,
          dateTo: dateTo ? formatDate(dateTo) : null,
        },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const totalDebit = data.reduce((s, i) => s + (i.DebitAmount || 0), 0);
  const totalCredit = data.reduce((s, i) => s + (i.CreditAmount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto bg-sky-100 mt-4 mb-6 p-3 sm:p-4 rounded-lg">

      {/* Title */}
      <h2 className="text-center font-bold mb-6 text-lg sm:text-2xl">
        Account Ledger Report
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <AccountSelector onSelectAccount={setAccountNumber} />
        <ReportDate
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={fetchData}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
        >
          Search
        </button>

        <button
          onClick={() => navigate('/MainPage')}
          className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white text-sm"
        >
          Main Page
        </button>
      </div>

      {/* Table Wrapper */}
      <div className="relative overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full min-w-[900px] border-collapse text-xs sm:text-sm">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              {[
                'Date',
                'V No',
                'V Type',
                'Sr No',
                'Description',
                'Debit',
                'Credit',
              ].map((h) => (
                <th
                  key={h}
                  className="border px-2 sm:px-3 py-2 text-left whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
              >
                <td className="border px-2 py-1 whitespace-nowrap">
                  {formatDate(item.EntryDate)}
                </td>
                <td className="border px-2 py-1">{item.voucherno}</td>
                <td className="border px-2 py-1">{item.Vouchertype}</td>
                <td className="border px-2 py-1">{item.SerialNo}</td>

                {/* Description limited on mobile */}
                <td className="border px-2 py-1 max-w-[220px] truncate">
                  {item.Remarks}
                </td>

                <td className="border px-2 py-1 text-right">
                  {item.DebitAmount}
                </td>
                <td className="border px-2 py-1 text-right">
                  {item.CreditAmount}
                </td>
              </tr>
            ))}

            {/* Totals */}
            <tr className="font-semibold bg-gray-100">
              <td colSpan={5} className="border px-2 py-2 text-right">
                Totals
              </td>
              <td className="border px-2 py-2 text-right">{totalDebit}</td>
              <td className="border px-2 py-2 text-right">{totalCredit}</td>
            </tr>

            {/* Balance */}
            <tr className="font-semibold bg-gray-200">
              <td colSpan={6} className="border px-2 py-2 text-right">
                Balance
              </td>
              <td className="border px-2 py-2 text-right">
                {totalDebit - totalCredit}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Hint */}
      <p className="text-xs text-gray-600 mt-2 sm:hidden">
        👉 Swipe left/right to view full table
      </p>
    </div>
  );
};

export default Reportd;
