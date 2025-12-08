import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemType = ({ onSelectitemtype }) => {
    const [itemtype, setItemtype] = useState([]);
    const [selecteditemtype, setSelectedItemtype] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('/api/itemType');
               
                setItemtype(response.data);
            } catch (error) {
                console.error('Error fetching account codes and names:', error);
            }
        };

        fetchAccounts();
    }, []);

    const handleChange = (e) => {
        setSelectedItemtype(e.target.value);
        onSelectitemtype(e.target.value); // Pass the selected account back to the parent component
    };

    return (
        <div className="mb-3">
            <label htmlFor="accountSelector" className="form-label"><strong>Item Type:</strong> </label>
            <select
                id="accountSelector"
                className="form-control"
                value={selecteditemtype}
                onChange={handleChange}
            >
                <option value="">Select Item Type</option>
                {itemtype.map((account) => (
                    <option key={account.itemtype} value={account.itemtype}>
                        {account.itemtype} 
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ItemType;
