import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemCode = ({ onSelectItemCode }) => {
    const [itemCode, setItemCode] = useState([]);
    const [selectedItemCode, setSelectedItemCode] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/itemCode');
                setItemCode(response.data);
            } catch (error) {
                console.error('Error fetching account codes and names:', error);
            }
        };

        fetchAccounts();
    }, []);

    const handleChange = (e) => {
        setSelectedItemCode(e.target.value);
        onSelectItemCode(e.target.value); // Pass the selected account back to the parent component
    };

    return (
        <div className="mb-3">
            <label htmlFor="accountSelector" className="form-label">Item Code:</label>
            <select
                id="accountSelector"
                className="form-control"
                value={selectedItemCode}
                onChange={handleChange}
            >
                <option value="">Select Item Code</option>
                {itemCode.map((account) => (
                    <option key={account.itemcode} value={account.itemcode}>
                        {account.itemcode} - {account.itemname}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ItemCode;
