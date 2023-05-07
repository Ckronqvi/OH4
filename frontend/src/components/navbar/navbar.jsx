import React from 'react';
import homeImage from '../../assets/home.png';
import styles from './navbar.module.css'

const Navbar = () => {
  // Check if JWT token is present in session storage
  const jwtToken = sessionStorage.getItem('jwtToken');

  // Update link text and href based on JWT token presence
  const loginLinkText = jwtToken ? 'Kirjaudu ulos' : 'Kirjaudu';
  const loginLinkHref = jwtToken ? '/logout' : '/login';

  const handleLogout = () => {
    sessionStorage.removeItem('jwtToken');
    window.location.reload();
  };

  return (
    <>
      <div className={styles.navigationbar}>
        <div className={styles.navLinks}>
          <div className={styles.homeLogo}>
            <a href="/" className={styles.homeLogo}>
              <img src={homeImage} alt="logo of a house" />
            </a>
          </div>
          <div className={styles.searchBar}>
            <input type="text" id="search" placeholder="Haku..." style={{ width: '130%', height: '40px', fontSize: '18px' }} />
          </div>
          <div className={styles.linksContainer}>
          <button className={styles.navButton} style={{ height: '50px', fontSize: '18px', width: '113px' }} onClick={() => window.location.href = "/addListing"}>
            Jätä ilmoitus
          </button>
          {jwtToken ? (
            <button className={styles.navButton} onClick={() => handleLogout()} style={{ height: '50px', fontSize: '18px'}}>
              Kirjaudu ulos
            </button>
          ) : (
            <button className={styles.navButton} style={{ height: '50px', fontSize: '18px', width: '113px' }} onClick={() => window.location.href = loginLinkHref}>
              {loginLinkText}
            </button>
          )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;