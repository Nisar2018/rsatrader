import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AccountSelector from '../Component/AccountSelector';
import ReportDate from '../Component/ReportDate';
import ItemType from '../Component/ItemType';
import ItemCompany from '../Component/ItemCompany';
import BranchCode from '../Component/BranchCode';
import AreaName from '../Component/AreaName';
import CityName from '../Component/CityName';
import Salesman from '../Component/Salesman';

const SaleActivity = () => {
  const [data, setData] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [areaName, setAreaName] = useState('');
  const [cityName, setCityName] = useState('');
  const [itemType, setItemType] = useState('');
  const [itemCompany, setItemCompany] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [salesman, setSalesman] = useState('');

  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/saleActivity', {
        params: {
          accountNumber,
          itemType,
          itemCompany,
          branchCode,
          areaName,
          cityName,
          salesman,
          dateFrom: dateFrom ? formatDate(dateFrom) : null,
          dateTo: dateTo ? formatDate(dateTo) : null,
        },
      });
      setData(res.data || []);
    } catch (err) {
      console.error('Error fetching sale activity:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-sky-100 mt-4 mb-6 p-3 sm:p-4 rounded-lg">

      {/* ================= TITLE ================= */}
      <h2 className="text-center font-bold mb-6 text-lg sm:text-2xl">
        Sale Activity Report
      </h2>

      {/* ================= FILTERS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <AccountSelector onSelectAccount={setAccountNumber} />
        <BranchCode onSelectBranchCode={setBranchCode} />
        <ItemType onSelectitemtype={setItemType} />
        <ItemCompany onSelectitemcompany={setItemCompany} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <AreaName onSelectAreaname={setAreaName} />
        <CityName onSelectCityname={setCityName} />
        <Salesman onSelectSalesman={setSalesman} />
      </div>

      {/* ================= DATE ================= */}
      <div className="mb-4">
        <ReportDate
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
        />
      </div>

      {/* ================= BUTTONS ================= */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
        >
          Search
        </button>

        <button
          onClick={() => navigate('/MainPage')}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm"
        >
          Main Page
        </button>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="block sm:hidden">
        {data.length === 0 ? (
          <p className="text-center text-sm text-gray-600 mt-4">
            No records found
          </p>
        ) : (
          <div className="space-y-3 mt-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow border p-3 text-sm"
              >
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{formatDate(item.entrydate)}</span>
                  <span>V No: {item.voucherno}</span>
                </div>

                <div className="font-semibold text-gray-800">
                  {item.itemname}
                </div>

                <div className="text-xs text-gray-600 mb-2">
                  Code: {item.itemcode} | Sr: {item.serialno}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>Qty: <b>{item.quantity}</b></div>
                  <div>Rate: <b>{item.purchaserate}</b></div>
                  <div>Gross: <b>{item.grossamount}</b></div>
                  <div>Disc: <b>{item.discountamount}</b></div>
                </div>

                <div className="mt-2 text-right font-semibold text-blue-700">
                  Net: {item.netamount}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded-lg shadow mt-4">
        <table className="min-w-[1200px] w-full border-collapse text-sm">
          <thead className="bg-gray-200">
            <tr>
              {[
                'Date',
                'V No',
                'Vendor',
                'Sr',
                'Item Code',
                'Item Name',
                'Qty',
                'Rate',
                'Gross',
                'Disc',
                'Net',
              ].map((h) => (
                <th key={h} className="border px-2 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <td className="border px-2 py-1">{formatDate(item.entrydate)}</td>
                <td className="border px-2 py-1">{item.voucherno}</td>
                <td className="border px-2 py-1">{item.vendorname}</td>
                <td className="border px-2 py-1">{item.serialno}</td>
                <td className="border px-2 py-1">{item.itemcode}</td>
                <td className="border px-2 py-1">{item.itemname}</td>
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

    </div>
  );
};

export default SaleActivity;
