import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountSelector = ({ onSelectAccount }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/api/accountcode');
        if (Array.isArray(response.data)) {
          setAccounts(response.data);
        } else {
          console.error('Account API returned non-array data:', response.data);
          setAccounts([]);
        }
      } catch (error) {
        console.error('Error fetching account codes and names:', error);
        setAccounts([]);
      }
    };

    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    setSelectedAccount(e.target.value);
    onSelectAccount(e.target.value);
  };

  return (
    <div className="mb-4 w-full sm:w-3/4">
      <label
        htmlFor="accountSelector"
        className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
      >
        Select Account:
      </label>
      <select
        id="accountSelector"
        value={selectedAccount}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      >
        <option value="">Select an account</option>
        {accounts.map((account) => (
          <option key={account.AccountNumber} value={account.AccountNumber}>
            {account.AccountNumber} - {account.AccountName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AccountSelector;
