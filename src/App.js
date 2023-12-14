import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './page/NavBar';
import './App.css';
import RegistrationForm from './page/RegistrationForm';
import Profile from './page/Profile';
import Order from './page/Order';
import Orders from './page/Orders';
import Main from './page/Main';
import Login from './page/Login';
import FavoriteAuthors from './page/FavoriteAuthors';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('accessToken'));
    }, []);

    return (
        <Router>
            <div>
                <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/FavoriteAuthors" element={<FavoriteAuthors />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Order" element={<Order />} />
                    <Route path="/Orders" element={<Orders />} />
                    {!isLoggedIn && <Route path="/Login" element={<Login />} />}
                    {!isLoggedIn && <Route path="/Registration" element={<RegistrationForm />} />}
                </Routes>
            </div>
        </Router>
    );
}

export default App;