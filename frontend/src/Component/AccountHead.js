import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountHead = ({ onSelectAccountHead }) => {
    const [accountHead, setAccountHead] = useState([]);
    const [selectedaccountHead, setSelectedAccountHead] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                // Picking data from function accountHead.js
                const response = await axios.get('http://localhost:5000/accountHead');
             
                setAccountHead(response.data);
            } catch (error) {
                console.error('Error fetching account codes and names:', error);
            }
        };
        fetchAccounts();
    }, []);
    const handleChange = (e) => {
        setSelectedAccountHead(e.target.value);
        onSelectAccountHead(e.target.value); // Pass the selected account back to the parent component
    };
    return (
        <div className="mb-3">
            <label htmlFor="accountSelector" className="form-label"><strong>Select Account:</strong></label>
            <select
                id="accountSelector"
                className="form-control"
                value={selectedaccountHead}
                onChange={handleChange}
            >
                <option value=""><strong>Select an Account Head</strong></option>
                {accountHead.map((account) => (
                    <option key={account.AccountNumber} value={account.AccountNumber}>
                        {account.AccountNumber} - {account.AccountName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AccountHead;
