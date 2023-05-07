import React from 'react';
import styles from "./customNavbar.module.css";
import homeImage from "../../assets/home.png"

const handleLogout = () => {
    sessionStorage.removeItem('jwtToken');
    window.location.href = '/'
  };

const customNavbar = () => {
return (
      <div className={styles.navigationbar}>
        <div className={styles.navLinks}>
          <div className={styles.homeLogo}>
            <a href="/" className={styles.homeLogo}>
              <img src={homeImage} alt="logo of a house" />
            </a>
          </div>
          <div className={styles.linksContainer}>
            <button className={styles.navButton} onClick={() => handleLogout()} style={{ height: '50px', fontSize: '18px'}}>
              Kirjaudu ulos
            </button>
          </div>
        </div>
      </div>
  );
};

export default customNavbar;