import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simulating form submission without connecting to the backend
        console.log("Login submitted with email:", email);

        // Simulate login success with mock data
        const mockResponse = { success: true, message: "Login successful!" };

        if (mockResponse.success) {
            console.log("Login successful:", mockResponse.message);
            // Simulate successful login by redirecting to a dashboard page or another page
            navigate('/questions');
        } else {
            alert(`Error logging in: ${mockResponse.message}`);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            {/* Wrapping the form inside the div to center it */}
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
