import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountHead = ({ onSelectAccountHead }) => {
  const [accountHead, setAccountHead] = useState([]);
  const [selectedAccountHead, setSelectedAccountHead] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/api/accountHead');
        setAccountHead(response.data);
      } catch (error) {
        console.error('Error fetching account codes and names:', error);
      }
    };
    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    setSelectedAccountHead(e.target.value);
    onSelectAccountHead(e.target.value); // Pass selected value to parent
  };

  return (
    <div className="mb-4 w-full sm:w-3/4">
      <label
        htmlFor="accountSelector"
        className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
      >
        Account Head:
      </label>
      <select
        id="accountSelector"
        value={selectedAccountHead}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      >
        <option value="">Select an Account Head</option>
        {accountHead.map((account) => (
          <option key={account.AccountNumber} value={account.AccountNumber}>
            {account.AccountNumber} - {account.AccountName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AccountHead;
