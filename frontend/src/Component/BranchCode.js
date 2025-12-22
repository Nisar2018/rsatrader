import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BranchCode = ({ onSelectBranchCode }) => {
  const [branchCode, setBranchCode] = useState([]);
  const [selectedBranchCode, setSelectedBranchCode] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/api/branchCode');
        setBranchCode(response.data);
      } catch (error) {
        console.error('Error fetching branch codes:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    setSelectedBranchCode(e.target.value);
    onSelectBranchCode(e.target.value); // Pass selected value to parent
  };

  return (
    <div className="mb-4 w-full sm:w-3/4">
      <label
        htmlFor="branchSelector"
        className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
      >
        Branch Code:
      </label>
      <select
        id="branchSelector"
        value={selectedBranchCode}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      >
        <option value="">Select Branch Code</option>
        {branchCode.map((account) => (
          <option key={account.branchid} value={account.branchid}>
            {account.branchid} - {account.branchname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BranchCode;
