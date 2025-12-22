import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AccountSelector from '../Component/AccountSelector';
import ReportDate from '../Component/ReportDate';
import ItemType from '../Component/ItemType';
import ItemCompany from '../Component/ItemCompany';
import BranchCode from '../Component/BranchCode';

const PurchaseActivity = () => {
  const [data, setData] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [itemType, setItemType] = useState('');
  const [itemCompany, setItemCompany] = useState('');
  const [branchCode, setBranchCode] = useState('');
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

  const fetchData = async () => {
    const params = {
      accountNumber,
      itemType,
      itemCompany,
      branchCode,
      dateFrom: dateFrom ? formatDate(dateFrom) : null,
      dateTo: dateTo ? formatDate(dateTo) : null,
    };

    axios
      .get('/api/purchaseActivity', { params })
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching report:', error));
  };

  return (
    <div className="max-w-7xl mx-auto bg-sky-100 mt-4 mb-6 p-4 rounded-lg">

      {/* Heading */}
      <h2 className="text-center font-bold mb-6
                     text-lg sm:text-xl md:text-2xl lg:text-3xl">
        Purchase Activity Report
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <AccountSelector onSelectAccount={setAccountNumber} />
        <BranchCode onSelectBranchCode={setBranchCode} />
        <ItemType onSelectitemtype={setItemType} />
        <ItemCompany onSelectitemcompany={setItemCompany} />
      </div>

      {/* Date Filter */}
      <div className="mb-4">
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
                'Vendor Name',
                'Sr No',
                'Item Code',
                'Item Name',
                'Quantity',
                'Purchase Rate',
                'Gross Amount',
                'Discount',
                'Net Amount',
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
                <td className="border px-3 py-1">{formatDate(item.entrydate)}</td>
                <td className="border px-3 py-1">{item.voucherno}</td>
                <td className="border px-3 py-1">{item.vendorname}</td>
                <td className="border px-3 py-1">{item.serialno}</td>
                <td className="border px-3 py-1">{item.itemcode}</td>
                <td className="border px-3 py-1">{item.itemname}</td>
                <td className="border px-3 py-1">{item.quantity}</td>
                <td className="border px-3 py-1">{item.purchaserate}</td>
                <td className="border px-3 py-1">{item.grossamount}</td>
                <td className="border px-3 py-1">{item.discountamount}</td>
                <td className="border px-3 py-1">{item.netamount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseActivity;
