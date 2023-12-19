import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import './index.css';
import globals from '../globals'

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Tutaj wykonaj zapytanie do serwera, aby pobrać dane użytkownika
    // Użyj odpowiedniego endpointa np. /user/{id}, gdzie id to identyfikator zalogowanego użytkownika
    // Zaktualizuj stan komponentu setUserData(response.data) z danymi użytkownika
    // Przykład użycia fetch:
    const userId = 1; // Zastąp odpowiednim identyfikatorem zalogowanego użytkownika
    fetch(globals.get("backend") + `/user/${userId}`)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []); // Wywołaj to zapytanie tylko raz, po zamontowaniu komponentu

  return (
    <div>
      <h2>User Profile</h2>
      {userData && (
        <div>
          <p>Login: {userData.login}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
