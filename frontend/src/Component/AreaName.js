import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AreaName = ({ onSelectAreaname }) => {
    const [areaname, setAreaname] = useState([]);
    const [selectedareaname, setSelectedAreaname] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/areaName');
           
               setAreaname(response.data);
            } catch (error) {
                console.error('Error fetching account codes and names:', error);
            }
        };

        fetchAccounts();
    }, []);

    const handleChange = (e) => {
        setSelectedAreaname(e.target.value);
        onSelectAreaname(e.target.value); // Pass the selected account back to the parent component
    };

    return (
        <div className="mb-3">
            <label htmlFor="areaname" className="form-label"><strong>Select an Area Name:</strong></label>
            <select
                id="areaname"
                className="form-control"
                value={selectedareaname}
                onChange={handleChange}
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
