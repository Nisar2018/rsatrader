import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Salesman = ({ onSelectSalesman }) => {
    const [salesman, setSalesman] = useState([]);
    const [selectedsalesman, setSelectedSalesman] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/salesman');
               
               setSalesman(response.data);
            } catch (error) {
                console.error('Error fetching account codes and names:', error);
            }
        };

        fetchAccounts();
    }, []);

    const handleChange = (e) => {
        setSelectedSalesman(e.target.value);
        onSelectSalesman(e.target.value); // Pass the selected account back to the parent component
    };

    return (
        <div className="mb-3">
            <label htmlFor="salesman" className="form-label"><syrong>Select Salesman Name:</syrong> </label>
            <select
                id="salesman"
                className="form-control"
                value={selectedsalesman}
                onChange={handleChange}
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
