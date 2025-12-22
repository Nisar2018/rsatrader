import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ItemType from '../Component/ItemType';
import BranchCode from '../Component/BranchCode';
import DateS from '../Component/DateS';
import StoreCode from '../Component/StoreCode';
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
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  };

  const fetchData = async () => {
    const params = {
      itemtype,
      branchCode,
      itemcompany,
      storecode,
      dateTo: dateTo ? formatDate(dateTo) : null,
    };

    try {
      const response = await axios.get('/api/itemsummary', { params });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  const handleSearch = () => fetchData();
  const handleMainPage = () => navigate('/MainPage');

  useEffect(() => {}, []);

  return (
    <div className="max-w-6xl mx-auto bg-blue-100 mt-4 p-4 sm:p-6 rounded-lg">

      {/* Title */}
      <h2 className="text-center font-bold text-lg sm:text-xl md:text-2xl mb-6">
        Item Summary Report
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <ItemType onSelectitemtype={setItemtype} />
        <ItemCompany onSelectitemcompany={setItemcompany} />
        <BranchCode onSelectBranchCode={setBranchCode} />
        <StoreCode onSelectStoreCode={setstorecode} />
      </div>

      {/* Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 mb-4">
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

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border border-gray-200 text-xs sm:text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Item Code</th>
              <th className="border px-3 py-2 text-left">Item Name</th>
              <th className="border px-3 py-2 text-right">Quantity In</th>
              <th className="border px-3 py-2 text-right">Quantity Out</th>
              <th className="border px-3 py-2 text-right">Balance</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 text-sm"
                >
                  No data found
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="border px-3 py-2">{item.itemcode}</td>
                  <td className="border px-3 py-2">{item.itemname}</td>
                  <td className="border px-3 py-2 text-right">
                    {item.quantityin}
                  </td>
                  <td className="border px-3 py-2 text-right">
                    {item.quantityout}
                  </td>
                  <td className="border px-3 py-2 text-right">
                    {item.balancequantity}
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

export default ItemSummery;
