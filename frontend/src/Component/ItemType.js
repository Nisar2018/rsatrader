import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemType = ({ onSelectitemtype }) => {
  const [itemtype, setItemtype] = useState([]);
  const [selecteditemtype, setSelectedItemtype] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/api/itemType');
        setItemtype(response.data);
      } catch (error) {
        console.error('Error fetching item types:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    setSelectedItemtype(e.target.value);
    onSelectitemtype(e.target.value); // Pass selected value to parent
  };

  return (
    <div className="mb-4 w-full sm:w-3/4">
      <label
        htmlFor="itemTypeSelector"
        className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
      >
        Item Type:
      </label>
      <select
        id="itemTypeSelector"
        value={selecteditemtype}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      >
        <option value="">Select Item Type</option>
        {itemtype.map((account) => (
          <option key={account.itemtype} value={account.itemtype}>
            {account.itemtype}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemType;
