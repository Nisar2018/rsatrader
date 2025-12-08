import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
//import MainPage from './Pages/MainPage';
import { useNavigate } from 'react-router-dom';
import './main.css';


const LoginForm = (onLogin) => {
    const [Database, setDataBase] = useState('');
    const [UserName, setUserName] = useState('');
    const [Passward, setPassward] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
     
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('/api/login', {
                params: { UserName, Passward, Database}  
            });
            
            console.log(response.data.message);
            // Store session information in sessionStorage
            sessionStorage.setItem('isLoggedIn', true);
            // Redirect to MainPage
            
            navigate('/MainPage');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center  vh-50">
            <div className="card p-4 bg-info text-dark">
                <h2 className="text-center mb-4 fs-1" >Login</h2>
                <form onSubmit={handleLogin}>
                <div className="mb-3 fs-4">
                        <label className="form-label">Database:</label>
                        <input type="text" className="form-control" value={Database} onChange={(e) => setDataBase(e.target.value)} />
                    </div>
                    <div className="mb-3 fs-4">
                        <label className="form-label">User Name:</label>
                        <input type="text" className="form-control" value={UserName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="mb-3 fs-4">
                        <label className="form-label" for="Passward">Password:</label>
                        <input type="password" className="form-control" value={Passward} onChange={(e) => setPassward(e.target.value)} />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
        </div>
    );
};

   
    export default LoginForm;