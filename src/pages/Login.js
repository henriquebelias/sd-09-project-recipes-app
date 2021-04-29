import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonOff, setButtonOff] = useState(true);

  useEffect(() => {
    const validateEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const passwordLength = password.length;
    const minPasswordLength = 6;
    if (validateEmail.test(userEmail) && passwordLength > minPasswordLength) {
      setButtonOff(false);
    } else {
      setButtonOff(true);
    }
  }, [password, userEmail]);

  function handleChangeEmail({ target }) {
    setUserEmail(target.value);
  }

  function handleChangePassword({ target }) {
    setPassword(target.value);
  }

  function handleLogin() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    const user = { email: userEmail };
    localStorage.setItem('user', JSON.stringify(user));
  }

  return (
    <div>
      <input
        onChange={ handleChangeEmail }
        type="email"
        data-testid="email-input"
      />
      <input
        onChange={ handleChangePassword }
        type="password"
        min="6"
        data-testid="password-input"
      />

      <Link to="/comidas">
        <button
          disabled={ buttonOff }
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleLogin }
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}
