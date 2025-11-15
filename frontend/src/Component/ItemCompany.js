import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemCompany = ({ onSelectitemcompany }) => {
    const [itemcompany, setItemcompany] = useState([]);
    const [selecteditemcompany, setSelectedItemcompany] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/itemCompany');
              
                setItemcompany(response.data);
            } catch (error) {
                console.error('Error fetching account codes and names:', error);
            }
        };

        fetchAccounts();
    }, []);

    const handleChange = (e) => {
        setSelectedItemcompany(e.target.value);
        onSelectitemcompany(e.target.value); // Pass the selected account back to the parent component
    };

    return (
        <div className="mb-3">
            <label htmlFor="accountSelector" className="form-label"><strong>Item Company:</strong> </label>
            <select
                id="accountSelector"
                className="form-control"
                value={selecteditemcompany}
                onChange={handleChange}
            >
                <option value="">Select Item Company</option>
                {itemcompany.map((account) => (
                    <option key={account.itemtcompany} value={account.itemcompany}>
                        {account.itemcompany} 
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ItemCompany;
