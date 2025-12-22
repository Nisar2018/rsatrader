import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AreaName = ({ onSelectAreaname }) => {
  const [areaname, setAreaname] = useState([]);
  const [selectedAreaname, setSelectedAreaname] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/api/areaName');
        setAreaname(response.data);
      } catch (error) {
        console.error('Error fetching area names:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    setSelectedAreaname(e.target.value);
    onSelectAreaname(e.target.value);
  };

  return (
    <div className="mb-4 w-full sm:w-3/4">
      <label
        htmlFor="areaname"
        className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
      >
        Area Name:
      </label>
      <select
        id="areaname"
        value={selectedAreaname}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      >
        <option value="">Select an Area Name</option>
        {areaname.map((account) => (
          <option key={account.areaname} value={account.areaname}>
            {account.areaname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AreaName;
