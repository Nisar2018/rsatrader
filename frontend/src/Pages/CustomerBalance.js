import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AreaName from '../Component/AreaName';
import BranchCode from '../Component/BranchCode';
import CityName from '../Component/CityName';
import DateS from '../Component/DateS';
import Salesman from '../Component/Salesman';

const CustomerBalance = () => {
  const [data, setData] = useState([]);
  const [dateTo, setDateTo] = useState('');
  const [areaname, setAreaname] = useState('');
  const [cityname, setCityname] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [salesman, setSalesman] = useState('');

  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  };

  const fetchData = async () => {
    const params = {
      areaname,
      branchCode,
      cityname,
      salesman,
      dateTo: dateTo ? formatDate(dateTo) : null,
    };

    try {
      const response = await axios.get('/api/customerBalance', { params });
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
        Customer Balance Report
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <AreaName onSelectAreaname={setAreaname} />
        <CityName onSelectCityname={setCityname} />
        <BranchCode onSelectBranchCode={setBranchCode} />
        <Salesman onSelectSalesman={setSalesman} />
      </div>

      {/* Date */}
      <div className="mb-4">
        <DateS dateTo={dateTo} setDateTo={setDateTo} />
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
              <th className="border px-3 py-2 text-left">Account Code</th>
              <th className="border px-3 py-2 text-left">Customer Name</th>
              <th className="border px-3 py-2 text-right">Debit</th>
              <th className="border px-3 py-2 text-right">Credit</th>
              <th className="border px-3 py-2 text-right">Balance</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
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
                  <td className="border px-3 py-2">{item.accountcode}</td>
                  <td className="border px-3 py-2">{item.customername}</td>
                  <td className="border px-3 py-2 text-right">
                    {item.debitamount}
                  </td>
                  <td className="border px-3 py-2 text-right">
                    {item.creditamount}
                  </td>
                  <td className="border px-3 py-2 text-right">
                    {item.balance}
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

export default CustomerBalance;
