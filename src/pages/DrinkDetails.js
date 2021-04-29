import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const DrinkDetails = ({ match: { params: { id } } }) => {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const result = await response.json();
        setRecipe(result.drinks[0]);
      } catch (error) {
        return Error(error);
      }
    };
    fetchRecipe();
  }, [id]);

  const renderRecipePhoto = () => (
    <img
      src={ recipe.strDrinkThumb }
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
        { recipe.strDrink }
      </h2>
    </div>

  );

  const renderRecipeCategory = () => (
    <div>
      <h5
        data-testid="recipe-category"
      >
        {recipe.strAlcoholic}
      </h5>
    </div>

  );

  const renderShareButton = () => (
    <button
      type="button"
      data-testid="share-btn"
    >
      Compartilhar
    </button>
  );

  const renderFavoriteButton = () => (
    <button
      type="button"
      data-testid="favorite-btn"
    >
      Favoritar
    </button>
  );

  const filterIngredients = () => {
    const recipeKeys = Object.keys(recipe);
    const recipeIngredientKeys = recipeKeys.filter((propriety) => (
      propriety.includes('strIngredient')));
    return recipeIngredientKeys.filter((ingredientKey) => (
      recipe[ingredientKey] !== null && recipe[ingredientKey] !== ''
    )).map((ingredintsKeys) => (
      recipe[ingredintsKeys]
    ));
  };

  const filterMeasures = () => {
    const measureKeys = Object.keys(recipe);
    const measureIngredientKeys = measureKeys.filter((propriety) => (
      propriety.includes('strMeasure')));
    return measureIngredientKeys.filter((measureKey) => (
      recipe[measureKey] !== null && recipe[measureKey] !== ''
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
              { `${ingredient} (${measureList[index] ? measureList[index] : ''})` }
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

  const renderRecomendedRecipes = () => (
    <div
      data-testid="0-recomendation-card"
    />
  );

  const renderStartRecipeButton = () => (
    <button
      type="button"
      data-testid="start-recipe-btn"
    >
      Iniciar receita
    </button>
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
      { renderRecomendedRecipes() }
      { renderStartRecipeButton() }
    </div>
  );
};

DrinkDetails.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default DrinkDetails;
