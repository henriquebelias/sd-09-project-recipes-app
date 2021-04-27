import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import SearchBar from './SearchBar';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const INITIAL_STATE = { search: '', shouldSearch: false };

function Header({ title, search }) {
  const [state, setState] = useState(INITIAL_STATE);

  const renderImage = (testid, src, alt) => (
    <img data-testid={ testid } src={ src } alt={ alt } />
  );

  const handleClick = () => {
    setState({ ...state, shouldSearch: !state.shouldSearch });
  };

  return (
    <header>
      <Link to="/perfil">
        { renderImage('profile-top-btn', profileIcon, 'profile icon') }
      </Link>

      <h1 data-testid="page-title">{ title }</h1>

      { search && (
        <button type="button" onClick={ handleClick }>
          { renderImage('search-top-btn', searchIcon, 'search icon')}
        </button>)}

      { state.shouldSearch
        && <SearchBar /> }
    </header>
  );
}

Header.propTypes = { title: string }.isRequired;

export default Header;
