import React, { useState } from 'react';
import Nav from './NavBar';
import './index.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        birthDate: '',
        gender: '',
        email: '',
        rodoAccepted: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setFormData({ ...formData, [name]: inputValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Convert form data to URL-encoded format
            const urlEncodedData = new URLSearchParams(formData).toString();

            // Send registration data to the backend
            const response = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlEncodedData,
            });

            if (response.ok) {
                // Registration successful, get the bearer token from the response
                const { token } = await response.json();

                // Store the bearer token in local storage
                localStorage.setItem('token', token);

                // You can redirect the user to the home page or perform any other actions
                console.log('Registration successful!');
            } else {
                // Handle registration error
                console.error('Registration failed.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* First Name */}
            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
            </label>
            <br />

            {/* Last Name */}
            <label>
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
            </label>
            <br />

            {/* Email */}
            <label>
                Email:
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </label>
            <br />

            {/* Password */}
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
            </label>
            <br />

            {/* Birth Date */}
            <label>
                Birth Date:
                <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                />
            </label>
            <br />

            {/* Gender */}
            <label>
                Gender:
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleInputChange}
                    /> Male
                </label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleInputChange}
                    /> Female
                </label>
            </label>
            <br />

            {/* RODO Checkbox */}
            <label>
                <input
                    type="checkbox"
                    name="rodoAccepted"
                    checked={formData.rodoAccepted}
                    onChange={handleInputChange}
                /> I accept RODO terms
            </label>
            <br />

            {/* Submit Button */}
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;