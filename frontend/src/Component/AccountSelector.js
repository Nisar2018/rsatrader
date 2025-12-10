import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountSelector = ({ onSelectAccount }) => {
    // accounts is initialized as an empty array
    const [accounts, setAccounts] = useState([]); 
    const [selectedAccount, setSelectedAccount] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                // Corrected API path to /api/accountcode
                const response = await axios.get('/api/accountcode');
              
                // **********************************************
                // CRITICAL FIX: Check if the data is an array
                // **********************************************
                if (Array.isArray(response.data)) {
                    // Success: Data is an array, safe to set
                    setAccounts(response.data);
                } else {
                    // Failure: Data is NOT an array (e.g., error object, null, or string).
                    console.error('Account API returned non-array data:', response.data);
                    // Set to empty array to prevent the component from crashing on .map()
                    setAccounts([]); 
                }
            } catch (error) {
                // Connection or 500-level API error occurred
                console.error('Error fetching account codes and names:', error);
                setAccounts([]); // Set to empty array on connection error
            }
        };

        fetchAccounts();
    }, []);

    const handleChange = (e) => {
        setSelectedAccount(e.target.value);
        onSelectAccount(e.target.value); 
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
                {/* SAFE: accounts is guaranteed to be an array here */}
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