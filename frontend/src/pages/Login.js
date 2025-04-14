import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/token/', {
                username,
                password
            });
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            alert('Logged in successfully');
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            alert('Incorrect credentials');
        }
    };

    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>login: </label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>password </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    );
}

export default Login;
