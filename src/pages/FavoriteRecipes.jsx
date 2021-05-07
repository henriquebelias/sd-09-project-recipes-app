import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [filter, setFilter] = useState('');
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const [copied, setCopy] = useState(false);

  const handleFilter = ({ target }) => {
    const { value } = target;
    setFilter(value);
  };

  const filterMeal = () => (
    favorites.filter((meal) => {
      switch (filter) {
      case 'All':
        return favorites;
      case 'Food':
        return meal.type === 'comida';
      case 'Drinks':
        return meal.type === 'bebida';
      default:
        return favorites;
      }
    })
  );

  function message() {
    return (
      <span>Link copiado!</span>
    );
  }

  function shareButtonClick(meal) {
    setCopy(true);
    copy(`http://localhost:3000/${meal.type}s/${meal.id}`);
    message();
  }

  function removeFavorite(meal) {
    const newFavorites = favorites
      .filter((food) => food.id !== meal.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  }

  const mealByFilter = filter ? filterMeal() : favorites;

  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="filter-by-all-btn"
          value="All"
          type="button"
          onClick={ handleFilter }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          value="Food"
          type="button"
          onClick={ handleFilter }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          value="Drinks"
          type="button"
          onClick={ handleFilter }
        >
          Drinks
        </button>
      </div>
      { (mealByFilter !== null) && mealByFilter.map((meal, index) => (
        meal.type === 'comida' ? (
          <div>
            <Link
              to={ `/comidas/${meal.id}` }
              key={ `${index}-recipe-card` }
            >
              <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
                <img
                  src={ meal.image }
                  data-testid={ `${index}-horizontal-image` }
                  alt={ meal.name }
                />
                <p data-testid={ `${index}-horizontal-name` }>{ meal.name }</p>
                <span data-testid={ `${index}-horizontal-top-text` }>
                  { `${meal.area} - ${meal.category}` }
                </span>
              </div>
            </Link>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ () => shareButtonClick(meal) }
            >
              {
                copied ? message() : (<img src={ shareIcon } alt="Compartilhar" />)
              }
            </button>
            <button
              type="button"
              onClick={ () => removeFavorite(meal) }
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
            >
              <img src={ blackHeartIcon } alt="blackHeartIcon" />
            </button>
          </div>
        )
          : (
            <div>
              <Link
                to={ `/bebidas/${meal.id}` }
                key={ `${index}-recipe-card` }
              >
                <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
                  <img
                    src={ meal.image }
                    data-testid={ `${index}-horizontal-image` }
                    alt={ meal.name }
                  />
                  <p data-testid={ `${index}-horizontal-name` }>{ meal.name }</p>
                  <span data-testid={ `${index}-horizontal-top-text` }>
                    { meal.alcoholicOrNot }
                  </span>
                </div>
              </Link>
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                onClick={ () => shareButtonClick(meal) }
              >
                {
                  copied ? message() : (<img src={ shareIcon } alt="Compartilhar" />)
                }
              </button>
              <button
                type="button"
                onClick={ () => removeFavorite(meal) }
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
              >
                <img src={ blackHeartIcon } alt="blackHeartIcon" />
              </button>
            </div>
          )
      ))}
    </div>
  );
}

export default FavoriteRecipes;
