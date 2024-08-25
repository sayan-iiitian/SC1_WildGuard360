import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
export default function Login() {
    const [credentials, setCredentials] = useState({userName: "", email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: credentials.userName,
                email: credentials.email,
                password: credentials.password,
            })
        });

        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter valid credentials");
        } else {
            localStorage.setItem("authToken", json.authToken);
            localStorage.setItem("userName", json.userName); // Store patient's name
            console.log(localStorage.getItem("authToken"));
            alert("Login successful!");
            navigate("/");
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div className='login-background'>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1 className='signuph1'>Users Login</h1>
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder="User's Name" 
                            name="userName"
                            value={credentials.userName}
                            onChange={onChange}
                            required 
                        />
                    </div>

                    <div className="input-box2">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                            required 
                        />
                    </div>

                    <div className="input-box2">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                            required 
                        />
                        <i className='bx bxs-lock'></i>
                    </div>

                    <div className="remember-forget">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                    </div>

                    <button type="submit" className="btn">Login</button>

                    <div className="register-link">
                        <p>Don't have an account? 
                            <Link to="/createuser">Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}