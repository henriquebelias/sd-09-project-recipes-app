import React from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';

function renderButton() {
  return (
    <button data-testid="search-top-btn" type="button" src={ searchImg }>
      <img alt="SearchImage" src={ searchImg } />
    </button>
  );
}

function createHeader({ title, showButton }) {
  return (
    <header>
      <Link to="/perfil"> 
        <button data-testid="profile-top-btn" type="button" src={ profileImg }>
          <img alt="ProfileImage" src={ profileImg } />
        </button>
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      {showButton && renderButton()}
    </header>
  );
}

export default createHeader;
