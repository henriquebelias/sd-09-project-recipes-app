import React from 'react';
import { number, shape } from 'prop-types';
import './cardRecipe.css';
import { Link } from 'react-router-dom';

function CardRecipeMeal({ recipe, index }) {
  return (
    <Link to={ `/comidas/${recipe.idMeal}` }>
      <div className="card-recipe-container" data-testid={ `${index}-recipe-card` }>
        <img
          src={ recipe.strMealThumb }
          alt={ `imagen de ${recipe.strMeal}` }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>
          { recipe.strMeal }
        </p>
      </div>
    </Link>
  );
}

CardRecipeMeal.propTypes = {
  recipe: shape().isRequired,
  index: number.isRequired,
};

export default CardRecipeMeal;