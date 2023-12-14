import React, { useState } from 'react';
import Nav from './NavBar';
import './index.css';

const RegistrationForm = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        birthDate: '',
        gender: '',
        email: '',
        rodoAccepted: false,
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // Use checked for checkboxes, otherwise use value
        const inputValue = type === 'checkbox' ? checked : value;

        // Update form data
        setFormData({ ...formData, [name]: inputValue });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to process registration data here
        console.log('Form Data:', formData);
        // You can add code here to send the formData to the backend
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