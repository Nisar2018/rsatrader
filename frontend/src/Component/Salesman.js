import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Salesman = ({ onSelectSalesman }) => {
  const [salesman, setSalesman] = useState([]);
  const [selectedSalesman, setSelectedSalesman] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/api/salesman');
        setSalesman(response.data);
      } catch (error) {
        console.error('Error fetching salesman data:', error);
      }
    };
    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    setSelectedSalesman(e.target.value);
    onSelectSalesman(e.target.value); // Pass the selected value back to parent
  };

  return (
    <div className="w-full sm:w-3/4 mb-4">
      {/* Label */}
      <label
        htmlFor="salesman"
        className="block text-gray-700 font-semibold text-sm sm:text-base mb-2"
      >
        Select Salesman Name:
      </label>

      {/* Select Dropdown */}
      <select
        id="salesman"
        value={selectedSalesman}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      >
        <option value="">Select Salesman Name</option>
        {salesman.map((account) => (
          <option key={account.salesman} value={account.salesman}>
            {account.salesman}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Salesman;
