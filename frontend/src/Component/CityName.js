import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CityName = ({ onSelectCityname }) => {
  const [cityname, setCityname] = useState([]);
  const [selectedCityname, setSelectedCityname] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/api/cityName');
        setCityname(response.data);
      } catch (error) {
        console.error('Error fetching city names:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    setSelectedCityname(e.target.value);
    onSelectCityname(e.target.value); // Pass selected value to parent
  };

  return (
    <div className="mb-4 w-full sm:w-3/4">
      <label
        htmlFor="citySelector"
        className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
      >
        City Name:
      </label>
      <select
        id="citySelector"
        value={selectedCityname}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      >
        <option value="">Select City Name</option>
        {cityname.map((account) => (
          <option key={account.cityname} value={account.cityname}>
            {account.cityname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityName;
