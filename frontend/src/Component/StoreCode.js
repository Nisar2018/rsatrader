import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const StoreCode = ({ onSelectStoreCode }) => {
    const [storeCode, setStoreCode] = useState([]);
    const [selectedStoreCode, setSelectedStoreCode] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('/api/storeCode');
               
                setStoreCode(response.data);
            } catch (error) {
                console.error('Error fetching account codes and names:', error);
            }
        };

        fetchAccounts();
    }, []);

    const handleChange = (e) => {
        setSelectedStoreCode(e.target.value);
        onSelectStoreCode(e.target.value); // Pass the selected account back to the parent component
    };

    return (
        <div className="mb-3">
            <label htmlFor="accountSelector" className="form-label">Store Code:</label>
            <select
                id="accountSelector"
                className="form-control"
                value={selectedStoreCode}
                onChange={handleChange}
            >
                <option value="">Select Store Code</option>
                {storeCode.map((account) => (
                    <option key={account.storeid} value={account.storeid}>
                        {account.storeid} - {account.storename}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StoreCode;
