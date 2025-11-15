import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CityName = ({ onSelectCityname }) => {
    const [cityname, setCityname] = useState([]);
    const [selectedcityname, setSelectedCityname] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/cityName');
               
               setCityname(response.data);
            } catch (error) {
                console.error('Error fetching account codes and names:', error);
            }
        };

        fetchAccounts();
    }, []);

    const handleChange = (e) => {
        setSelectedCityname(e.target.value);
        onSelectCityname(e.target.value); // Pass the selected account back to the parent component
    };

    return (
        <div className="mb-3">
            <label htmlFor="accountSelector" className="form-label">Select City Name:</label>
            <select
                id="accountSelector"
                className="form-control"
                value={selectedcityname}
                onChange={handleChange}
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
