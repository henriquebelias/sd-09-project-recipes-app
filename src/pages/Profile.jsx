import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      <h1 data-testid="page-title">Perfil</h1>
      <Header />
      <Footer />
    </div>
  );
}

export default Profile;
