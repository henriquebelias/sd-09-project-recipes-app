import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecomendedDinks from '../components/RecomendedDrinks';
import '../App.css';

const MealDetails = ({ match: { params: { id } } }) => {
  const [recipe, setRecipe] = useState({});
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const result = await response.json();
        setRecipe(result.meals[0]);
      } catch (error) {
        return Error(error);
      }
    };
    fetchRecipe();
  }, [id]);

  const renderRecipePhoto = () => (
    <img
      style={ { width: 30, height: 30 } }
      src={ recipe.strMealThumb }
      data-testid="recipe-photo"
      alt="Foto do prato"
      tagName="IMG"
    />
  );

  const renderRecipeTitle = () => (
    <div>
      <h2
        data-testid="recipe-title"
      >
        { recipe.strMeal }
      </h2>
    </div>

  );

  const renderRecipeCategory = () => (
    <div>
      <h5
        data-testid="recipe-category"
      >
        {recipe.strCategory}
      </h5>
    </div>

  );

  const copyLink = (idMeal) => {
    copy(`http://localhost:3000/comidas/${idMeal}`);
    setCopied(true);
  };

  const renderShareButton = () => (
    <button
      type="button"
      data-testid="share-btn"
      onClick={ () => copyLink(recipe.idMeal) }
    >
      {copied ? <span>Link copiado!</span> : <img src={ shareIcon } alt="Share" /> }
    </button>
  );

  const setStorage = () => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipe;
    const mealFavorite = {
      id: idMeal,
      type: 'comida',
      alcoholicOrNot: '',
      area: strArea,
      category: strCategory,
      name: strMeal,
      image: strMealThumb,
    };
    if (favorite) {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const itemStorage = storage.filter((item) => item.id !== idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(itemStorage));
    } else {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      if (storage) {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...storage, mealFavorite]),
        );
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([mealFavorite]));
      }
    }
  };

  const verifyFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const fav = favorites.filter((item) => item.id === id);
    if (fav.length) {
      if (favorite) {
        setFavorite(false);
      } else {
        setFavorite(true);
      }
    }
  };

  useEffect(() => {
    verifyFavorite();
  }, []);

  const handleFavoriteButton = () => {
    if (favorite) {
      setFavorite(false);
    } else {
      setFavorite(true);
    }
    setStorage();
  };

  const renderFavoriteButton = () => (
    <button
      type="button"
      onClick={ handleFavoriteButton }
      className="action-button"
    >
      <img
        src={ (favorite) ? blackHeartIcon : whiteHeartIcon }
        alt="favorite"
        data-testid="favorite-btn"
        className="favorite-icon"
      />
    </button>
  );

  const filterIngredients = () => {
    const recipeKeys = Object.keys(recipe);
    const recipeIngredientKeys = recipeKeys.filter((propriety) => (
      propriety.includes('strIngredient')));
    return recipeIngredientKeys.filter((ingredientKey) => (
      recipe[ingredientKey] !== '' && recipe[ingredientKey] !== null
    )).map((ingredintsKeys) => (
      recipe[ingredintsKeys]
    ));
  };

  const filterMeasures = () => {
    const measureKeys = Object.keys(recipe);
    const measureIngredientKeys = measureKeys.filter((propriety) => (
      propriety.includes('strMeasure')));
    return measureIngredientKeys.filter((measureKey) => (
      recipe[measureKey] !== '' && recipe[measureKey] !== null
    )).map((measureKey) => (
      recipe[measureKey]
    ));
  };

  const renderRecipeIngredients = () => {
    const ingredientsList = filterIngredients();
    const measureList = filterMeasures();
    return (
      <div>
        <h4>Lista de Ingredientes</h4>
        <ul>
          { ingredientsList.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredient }
            >
              { `${ingredient} (${measureList[index]})` }
            </li>
          ))}
        </ul>
      </div>

    );
  };

  const renderRecipeInstructions = () => (
    <div>
      <h3>Modo de preparo:</h3>
      <p
        data-testid="instructions"
      >
        { recipe.strInstructions }
      </p>
    </div>
  );

  const renderRecipeVideo = () => (
    <iframe
      title="video"
      width="300"
      height="300"
      src={ recipe.strYoutube }
      data-testid="video"
    />
  );

  const renderStartRecipeButton = () => (
    <Link to={ `${recipe.idMeal}/in-progress` }>
      <button
        className="footer"
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar receita
      </button>
    </Link>
  );

  return (
    <div>
      { renderRecipePhoto() }
      { renderRecipeTitle() }
      { renderRecipeCategory() }
      { renderShareButton() }
      { renderFavoriteButton() }
      { renderRecipeIngredients() }
      { renderRecipeInstructions() }
      { renderRecipeVideo() }
      <RecomendedDinks />
      { renderStartRecipeButton() }
    </div>
  );
};

MealDetails.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default MealDetails;
