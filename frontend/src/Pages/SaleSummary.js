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
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d)) return '';
    return d.toISOString().split('T')[0];
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/saleSummary', {
        params: {
          cityName,
          itemType,
          itemCompany,
          branchCode,
          areaName,
          salesman,
          dateFrom: dateFrom ? formatDate(dateFrom) : null,
          dateTo: dateTo ? formatDate(dateTo) : null,
        },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-sky-100 rounded-lg p-3 sm:p-4 mt-4">

      {/* Title */}
      <h2 className="text-center font-bold text-lg sm:text-xl mb-4">
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          Search
        </button>

        <button
          onClick={() => navigate('/MainPage')}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
        >
          Main Page
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="relative overflow-x-auto mt-5 bg-white rounded-lg shadow">
        <table className="min-w-[900px] w-full border-collapse text-xs sm:text-sm">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              {[
                'Item Code',
                'Item Name',
                'Qty',
                'Rate',
                'Gross',
                'Discount',
                'Net',
              ].map((head) => (
                <th
                  key={head}
                  className="border px-2 py-2 text-left whitespace-nowrap"
                >
                  {head}
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
                <td className="border px-2 py-1">{item.itemcode}</td>

                <td className="border px-2 py-1 max-w-[220px] truncate">
                  {item.itemname}
                </td>

                <td className="border px-2 py-1 text-right">{item.quantity}</td>
                <td className="border px-2 py-1 text-right">{item.purchaserate}</td>
                <td className="border px-2 py-1 text-right">{item.grossamount}</td>
                <td className="border px-2 py-1 text-right">{item.discountamount}</td>
                <td className="border px-2 py-1 text-right font-semibold">
                  {item.netamount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Hint */}
      <p className="text-xs text-gray-600 mt-2 sm:hidden">
        👉 Swipe left or right to view full table
      </p>

    </div>
  );
};

export default SaleSummary;
