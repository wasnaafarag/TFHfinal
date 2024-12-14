import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

function SignupForm() {
    const [formData, setFormData] = useState({
        username: '',
        age: '',
        email: '',
        password: '',
        gender: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simulating form submission without connecting to the backend
        console.log("Form submitted with data:", formData);

        // Simulate success with mock data
        const mockResponse = { success: true, message: "User registered successfully!" };

        if (mockResponse.success) {
            console.log("Registration successful:", mockResponse.message);
            // Redirect to the questions page after successful registration
            navigate('/questions'); // Redirect to the /questions page
        } else {
            alert(`Error registering user: ${mockResponse.message}`);
        }
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignupForm;
