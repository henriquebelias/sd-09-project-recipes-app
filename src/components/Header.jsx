import React, { Component } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';

class Header extends Component {
  render() {
    const { textProp } = this.props;
    return (
      <header className="header">
        <img
          src={ profileIcon }
          alt="Foto do perfil do usuário"
          data-testid="profile-top-btn"
        />
        <span className="span" data-testid="page-title">{ textProp }</span>
      </header>
    );
  }
}

Header.propTypes = {
  textProp: PropTypes.string.isRequired,
};

export default Header;
