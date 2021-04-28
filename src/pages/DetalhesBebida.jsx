import React from 'react';

class DetalhesBebida extends React.Component {
  render() {
    return (
      <div>
        {/* <img data-testid="recipe-photo" src={ image } alt="imagem da bebida" /> */}
        <h1 data-testid="recipe-title">Titulo</h1>
        <button data-testid="share-btn" type="button">
          <img src="../images/shareIcon.svg" alt="Share" />
        </button>
        <button data-testid="favorite-btn" type="button">
          <img src="../images/blackHeartIcon.svg" alt="Favorite" />
        </button>
        <h3 data-testid="recipe-category">Categoria</h3>
        <h2>Ingredientes:</h2>
        <ul>
          {/* <li
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            Ingrediente
          </li> */}
        </ul>
        <p data-testid="instructions">
          Instruções
        </p>
        {/* <video data-testid="video" width="320" height="240" controls muted>
          <source src={ video } type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        {/* Receitas Recomendadas devera ser um componente separado. */}
        <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
      </div>
    );
  }
}

export default DetalhesBebida;