import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AccountSelector from '../Component/AccountSelector';
import ReportDate from '../Component/ReportDate';
import BranchCode from '../Component/BranchCode';

const CashBook = () => {
  const [data, setData] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  };

  const fetchData = async () => {
    const params = {
      accountNumber,
      branchCode,
      dateFrom: dateFrom ? formatDate(dateFrom) : null,
      dateTo: dateTo ? formatDate(dateTo) : null,
    };

    try {
      const response = await axios.get('/api/cashBook', { params });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  const handleSearch = () => fetchData();
  const handleMainPage = () => navigate('/MainPage');

  useEffect(() => {}, []);

  return (
    <div className="max-w-7xl mx-auto bg-blue-100 p-4 sm:p-6 mt-4 rounded-lg">

      {/* Title */}
      <h2 className="text-center font-bold text-lg sm:text-xl md:text-2xl mb-6">
        Cash Book Report
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <AccountSelector onSelectAccount={setAccountNumber} />
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

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-200 text-xs sm:text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Date</th>
              <th className="border px-3 py-2 text-left">V No</th>
              <th className="border px-3 py-2 text-left">V Type</th>
              <th className="border px-3 py-2 text-left">Sr No</th>
              <th className="border px-3 py-2 text-left">Remarks</th>
              <th className="border px-3 py-2 text-right">Payment</th>
              <th className="border px-3 py-2 text-right">Receipt</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 text-xs sm:text-sm"
                >
                  No records found
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 hover:bg-blue-50"
                >
                  <td className="border px-3 py-2">
                    {formatDate(item.entrydate)}
                  </td>
                  <td className="border px-3 py-2">{item.voucherno}</td>
                  <td className="border px-3 py-2">{item.Vouchertype}</td>
                  <td className="border px-3 py-2">{item.SerialNo}</td>
                  <td className="border px-3 py-2">{item.Remarks}</td>
                  <td className="border px-3 py-2 text-right">
                    {item.payment}
                  </td>
                  <td className="border px-3 py-2 text-right">
                    {item.receipt}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashBook;
