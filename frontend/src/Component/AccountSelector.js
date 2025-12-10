import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountSelector = ({ onSelectAccount }) => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('/api/accountcode');
             
                setAccounts(response.data);
            } catch (error) {
                console.error('Error fetching account codes and names:', error);
            }
        };

        fetchAccounts();
    }, []);

    const handleChange = (e) => {
        setSelectedAccount(e.target.value);
        onSelectAccount(e.target.value); // Pass the selected account back to the parent component
    };

    return (
        <div className="mb-3">
            <label htmlFor="accountSelector" className="form-label"><strong>Select Account:</strong></label>
            <select
                id="accountSelector"
                className="form-control"
                value={selectedAccount}
                onChange={handleChange}
            >
                <option value="">Select an account</option>
                {accounts.map((account) => (
                    <option key={account.AccountNumber} value={account.AccountNumber}>
                        {account.AccountNumber} - {account.AccountName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AccountSelector;
