import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemCode = ({ onSelectItemCode }) => {
  const [itemCode, setItemCode] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/api/itemCode');
        setItemCode(response.data);
      } catch (error) {
        console.error('Error fetching item codes:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    setSelectedItemCode(e.target.value);
    onSelectItemCode(e.target.value); // Pass selected value to parent
  };

  return (
    <div className="mb-4 w-full sm:w-3/4">
      <label
        htmlFor="itemCodeSelector"
        className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
      >
        Item Code:
      </label>
      <select
        id="itemCodeSelector"
        value={selectedItemCode}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      >
        <option value="">Select Item Code</option>
        {itemCode.map((account) => (
          <option key={account.itemcode} value={account.itemcode}>
            {account.itemcode} - {account.itemname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemCode;
