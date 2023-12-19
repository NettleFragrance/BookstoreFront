import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import globals from '../globals'

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Usunięcie tokena z localStorage
    localStorage.removeItem('accessToken');
    // Ustawienie stanu zalogowania na false
    setIsLoggedIn(false);
    // Przekierowanie użytkownika na stronę główną
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">
          <span>Main</span>
          <img src="../img/home.png"/>
        </Link>

        <Link to="/Order">
          <span>Order</span>
          <img src="../img/user.png"/>
        </Link>

        {isLoggedIn ? (
          <>
            <Link to="/Profile">
              <span>Profile</span>
              <img src="../img/user.png" />
            </Link>

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/Login">
              <span>Login</span>
            </Link>

            <Link to="/Registration">
              <span>Register</span>
            </Link>
          </>
        )}
      </div>

      {isLoggedIn && (
        <div className="nav-right">
          <span>Profile</span>
          <ul>
            <li><Link to="/UserData">User Data</Link></li>
            <li><Link to="/Orders">Orders</Link></li>
            <li><Link to="/FavoriteAuthors">Favorite Authors</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
