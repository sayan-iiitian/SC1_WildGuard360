// src/components/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

export default function Signup() {
    const [credentials, setCredentials] = useState({
        userName: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (credentials.password !== credentials.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!/^\d{10}$/.test(credentials.mobile)) {
            toast.error("Mobile number must be exactly 10 digits");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: credentials.userName,
                    mobile: credentials.mobile,
                    email: credentials.email,
                    password: credentials.password
                })
            });

            const json = await response.json();
            if (!json.success) {
                json.errors.forEach(error => toast.error(error.msg));
            } else {
                toast.success("User Registered successfully!");
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page
                }, 2000); // 2 seconds delay
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("An error occurred during registration as the user already exists");
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div className='signup-background'>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1 className='signuph1'>Sign Up</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Patient's Name"
                            name="userName"
                            value={credentials.userName}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="number"
                            placeholder="Mobile Number"
                            name="mobile"
                            value={credentials.mobile}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Create Password"
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={credentials.confirmPassword}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="remember-forget">
                        <label>
                            <input type="checkbox" required />
                            Receive relevant information from WildGuard360
                        </label>
                    </div>
                    <button type="submit" className="btn">Register</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}
