import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './NavBar';
import './index.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rodoAccepted: false,
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: inputValue });
        setSubmitted(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login: formData.username,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("accessToken", data.accessToken);
                setSubmitted(true);
                navigate("/UserData");
            } else {
                setError(true);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError(true);
        }
    };

    const successMessage = () => {
        return (
            <div className="success" style={{ display: submitted ? '' : 'none' }}>
                <h1>{formData.username}, welcome back</h1>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div className="error" style={{ display: error ? '' : 'none' }}>
                <h3>Fill in all the gaps and accept RODO terms</h3>
            </div>
        );
    };

    return (
        <div>
            <div className="registration-form">
                <div>
                    <h2>Login</h2>
                </div>

                <div className="messages">
                    {errorMessage()}
                    {successMessage()}
                </div>

                <form>
                    <label className="label">Username</label>
                    <input
                        onChange={handleInputChange}
                        className="input"
                        value={formData.username}
                        type="text"
                        name="username"
                    />

                    <label className="label">Password</label>
                    <input
                        onChange={handleInputChange}
                        className="input"
                        value={formData.password}
                        type="password"
                        name="password"
                    />

                    <label>
                        <input
                            type="checkbox"
                            name="rodoAccepted"
                            checked={formData.rodoAccepted}
                            onChange={handleInputChange}
                        /> I accept RODO terms
                    </label>

                    <button onClick={handleSubmit} className="btn" type="submit">
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;