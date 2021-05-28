import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import './Header.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { title, searchBtn = false } = props;
  const [search, setSearch] = useState(false);

  const handleClick = () => {
    setSearch(!search);
  };

  const renderSearchButton = () => (
    <button
      type="button"
      data-testid="search-top-btn"
      src="../images/searchIcon.svg"
      onClick={ handleClick }
    >
      <img src={ searchIcon } alt="search" />
    </button>
  );

  const renderHeader = () => (
    <header className="Header">
      <Link to="/perfil">
        <button
          type="button"
          data-testid="profile-top-btn"
          src="../images/profileIcon.svg"
        >
          <img src={ profileIcon } alt="profile" />
        </button>
      </Link>
      <h3 data-testid="page-title">{ title }</h3>
      {searchBtn && renderSearchButton()}
    </header>
  );

  return (
    <div>
      {renderHeader()}
      {search && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  title: string,
}.isRequired;

export default Header;
