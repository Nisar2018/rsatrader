import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemCompany = ({ onSelectitemcompany }) => {
  const [itemcompany, setItemcompany] = useState([]);
  const [selecteditemcompany, setSelectedItemcompany] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/api/itemCompany');
        setItemcompany(response.data);
      } catch (error) {
        console.error('Error fetching item companies:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    setSelectedItemcompany(e.target.value);
    onSelectitemcompany(e.target.value); // Pass selected value to parent
  };

  return (
    <div className="mb-4 w-full sm:w-3/4">
      <label
        htmlFor="itemCompanySelector"
        className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
      >
        Item Company:
      </label>
      <select
        id="itemCompanySelector"
        value={selecteditemcompany}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      >
        <option value="">Select Item Company</option>
        {itemcompany.map((account) => (
          <option key={account.itemcompany} value={account.itemcompany}>
            {account.itemcompany}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemCompany;
