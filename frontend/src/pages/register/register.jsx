import React from 'react';
import styles from "./register.module.css";
import {useState} from 'react';
const Login = () => {

  const [error, setError] = useState(null);

  const clearError = () => {
    setTimeout(() => {
      setError(null);
    }, 4000);
  };

  const sendLoginInfo = async (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const firstname = formData.get('firstname');
    const lastname = formData.get('lastname');
    const username = formData.get('username');
    const password = formData.get('password');
    const phonenumber = formData.get('phonenumber');

    const payload = {
      firstname,
      lastname,  
      username,
      password,
      phonenumber
    };

    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('jwtToken', data.token);
        window.location.href = '/'; // Navigate to homepage
      } else {
        setError('Käyttäjätunnus on jo käytössä!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <html lang="fi" dir="ltr">
      <head>
        <meta charset="utf-8" />
        <title>Rekisteröidy</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </head>
      <body class="login-page" className={styles['login-page']}>
        <div className={styles.center}>
          <div className={styles.container}>
          <a href="/" className={`${styles['close-btn']} fas fa-times`} title="close"></a> 
            <div className={styles.text}>Rekisteröidy</div>
            <form onSubmit={sendLoginInfo}>
              <div className={styles.data}>
                <label htmlFor="firstname">Etunimi</label>
                <input type="text" id="firstname" name="firstname" required />
              </div>
              <div className={styles.data}>
                <label htmlFor="lastname">Sukunimi</label>
                <input type="text" id="lastname" name="lastname" required />
              </div>
              <div className={styles.data}>
                <label htmlFor="phonenumber">Puhelin</label>
                <input type="text" id="phonenumber" name="phonenumber" required />
              </div>
              <div className={styles.data}>
                <label htmlFor="username">Käyttäjätunnus</label>
                <input type="text" id="username" name="username" required />
              </div>
              <div className={styles.data}>
                <label htmlFor="password">Salasana</label>
                <input type="password" id="password" name="password" required />
              </div>
              <div className={styles.btn}>
                <div className={styles.inner}></div>
                <button type="submit">Luo tili</button>
              </div>
              <div className={styles['signup-link']}>
                Onko sinulla jo tili? <a href="/login">Kirjaudu sisään</a>
              </div>
            </form>
            {error && (
              <div className={styles.errorContainer}>
                <div className={styles.error}>{error}</div>
              </div>
            )}
            {error && clearError()}
          </div>
        </div>
      </body>
    </html>
  );
};

export default Login;