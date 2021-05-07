import React, { useState } from 'react';
import ShareIcon from '../images/shareIcon.svg';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    // const TIMEOUT = 3000;

    navigator.clipboard.writeText((window.location.href).split('/in-progress')[0]);
    const test = (window.location.href).split('/in-progress')[0];
    console.log(test);
    // setTimeout(() => setCopied(false), TIMEOUT);
    setCopied(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={ copyLink }
      >
        <img
          src={ ShareIcon }
          alt="Ícone de compartilhamento"
          data-testid="share-btn"
        />
      </button>
      <br />
      {copied
        && <span>Link copiado!</span>}
    </>
  );
}