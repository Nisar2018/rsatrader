import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BranchCode = ({ onSelectBranchCode }) => {
    const [branchCode, setBranchCode] = useState([]);
    const [selectedBranchCode, setSelectedBranchCode] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/branchCode');
                
                setBranchCode(response.data);
            } catch (error) {
                console.error('Error fetching account codes and names:', error);
            }
        };

        fetchAccounts();
    }, []);

    const handleChange = (e) => {
        setSelectedBranchCode(e.target.value);
        onSelectBranchCode(e.target.value); // Pass the selected account back to the parent component
    };

    return (
        <div className="mb-3">
            <label htmlFor="accountSelector" className="form-label"><strong>Branch Code:</strong></label>
            <select
                id="accountSelector"
                className="form-control"
                value={selectedBranchCode}
                onChange={handleChange}
            >
                <option value="">Select Branch Code</option>
                {branchCode.map((account) => (
                    <option key={account.branchid} value={account.branchid}>
                        {account.branchid} - {account.branchname}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BranchCode;
