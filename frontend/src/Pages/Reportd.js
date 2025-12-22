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
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;

    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const fetchData = () => {
    const params = {
      accountNumber,
      dateFrom: dateFrom ? formatDate(dateFrom) : null,
      dateTo: dateTo ? formatDate(dateTo) : null,
    };

    axios
      .get('/api/Reportd', { params })
      .then((res) => setData(res.data))
      .catch((err) => console.error('Error fetching report:', err));
  };

  const totalDebit = data.reduce(
    (sum, item) => sum + (item.DebitAmount || 0),
    0
  );
  const totalCredit = data.reduce(
    (sum, item) => sum + (item.CreditAmount || 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto bg-sky-100 mt-4 mb-6 p-4 rounded-lg">

      {/* Title */}
      <h2 className="text-center font-bold mb-6
                     text-lg sm:text-xl md:text-2xl lg:text-3xl">
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
          className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white
                     text-xs sm:text-sm md:text-base transition"
        >
          Search
        </button>

        <button
          onClick={() => navigate('/MainPage')}
          className="px-6 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white
                     text-xs sm:text-sm md:text-base transition"
        >
          Main Page
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-xs sm:text-sm md:text-base">
          <thead className="bg-gray-200">
            <tr>
              {[
                'Date',
                'V No',
                'V Type',
                'Sr No',
                'Description',
                'Debit Amount',
                'Credit Amount',
              ].map((head) => (
                <th
                  key={head}
                  className="border px-3 py-2 text-left font-semibold"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <td className="border px-3 py-1">
                  {formatDate(item.EntryDate)}
                </td>
                <td className="border px-3 py-1">{item.voucherno}</td>
                <td className="border px-3 py-1">{item.Vouchertype}</td>
                <td className="border px-3 py-1">{item.SerialNo}</td>
                <td className="border px-3 py-1">{item.Remarks}</td>
                <td className="border px-3 py-1">{item.DebitAmount}</td>
                <td className="border px-3 py-1">{item.CreditAmount}</td>
              </tr>
            ))}

            {/* Totals */}
            <tr className="font-semibold bg-gray-100">
              <td colSpan={5} className="border px-3 py-2 text-right">
                Totals
              </td>
              <td className="border px-3 py-2">{totalDebit}</td>
              <td className="border px-3 py-2">{totalCredit}</td>
            </tr>

            {/* Balance */}
            <tr className="font-semibold bg-gray-200">
              <td colSpan={6} className="border px-3 py-2 text-right">
                Balance
              </td>
              <td className="border px-3 py-2">
                {totalDebit - totalCredit}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reportd;