import React, { useState } from 'react';
import Nav from '/NavBar';

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
        
        // Jeśli element to checkbox, korzystaj z checked, w przeciwnym razie użyj value
        const inputValue = type === 'checkbox' ? checked : value;

        setFormData({ ...formData, [name]: inputValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Tutaj możesz dodać logikę do przetwarzania danych rejestracyjnych
        console.log('Form Data:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <label>
                <input
                    type="checkbox"
                    name="rodoAccepted"
                    checked={formData.rodoAccepted}
                    onChange={handleInputChange}
                /> I accept RODO terms
            </label>
            <br />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;