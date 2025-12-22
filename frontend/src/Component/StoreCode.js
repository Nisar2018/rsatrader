import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreCode = ({ onSelectStoreCode }) => {
  const [storeCode, setStoreCode] = useState([]);
  const [selectedStoreCode, setSelectedStoreCode] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/api/storeCode');
        setStoreCode(response.data);
      } catch (error) {
        console.error('Error fetching store codes:', error);
      }
    };
    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    setSelectedStoreCode(e.target.value);
    onSelectStoreCode(e.target.value);
  };

  return (
    <div className="w-full sm:w-3/4 mb-4">
      {/* Label */}
      <label
        htmlFor="storeCodeSelector"
        className="block text-gray-700 font-semibold text-sm sm:text-base mb-2"
      >
        Store Code:
      </label>

      {/* Select Dropdown */}
      <select
        id="storeCodeSelector"
        value={selectedStoreCode}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      >
        <option value="">Select Store Code</option>
        {storeCode.map((account) => (
          <option key={account.storeid} value={account.storeid}>
            {account.storeid} - {account.storename}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StoreCode;
