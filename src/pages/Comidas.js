import React from 'react';
import Header from '../components/Header';

class Comidas extends React.Component {
  render() {
    const searchIcon = true;
    return (
      <Header title="Comidas" searchIcon={ searchIcon } />
    );
  }
}

export default Comidas;
