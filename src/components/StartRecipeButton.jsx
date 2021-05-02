import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function StartRecipeButton({ id, recipe, recipeType, ingredients }) {
  const [recipeState, setRecipeState] = useState();

  const verifyIfRecipeWasStarted = useCallback(() => {
    const startedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    const { cocktails, meals } = startedRecipes;
    const mealsKeys = Object.keys(meals);
    const cocktailsKeys = Object.keys(cocktails);
    const mealsStarted = mealsKeys.some((key) => (
      key === recipe.idMeal
    ));
    const cocktailsStarted = cocktailsKeys.some((key) => (
      key === recipe.idDrink
    ));

    if (mealsStarted || cocktailsStarted) setRecipeState('started');
  }, [recipe]);

  const verifyIfRecipeWasFinished = useCallback(() => {
    const finishedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const mealsFinished = finishedRecipes.some((item) => (
      item.idMeal === recipe.idMeal
    ));
    const cocktailsFinished = finishedRecipes.some((item) => (
      item.idDrink === recipe.idDrink
    ));
    if (mealsFinished || cocktailsFinished) setRecipeState('finished');
  }, [recipe]);

  useEffect(() => {
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    if (!localStorage.getItem('inProgressRecipes')) {
      const object = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(object));
    }
    verifyIfRecipeWasStarted();
    verifyIfRecipeWasFinished();
  }, [recipe, verifyIfRecipeWasStarted, verifyIfRecipeWasFinished]);

  const startRecipe = () => {
    const startedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { cocktails, meals } = startedRecipes;
    if (recipeType === 'meals') {
      meals[recipe.idMeal] = ingredients;
    } else {
      cocktails[recipe.idDrink] = ingredients;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(startedRecipes));
  };

  const startRecipeButton = (
    <Link to={ `/comidas/${id}/in-progress` }>
      <button
        type="button"
        onClick={ startRecipe }
        data-testid="start-recipe-btn"
      >
        { !recipeState ? 'Iniciar Receita' : 'Continuar Receita' }
      </button>
    </Link>
  );

  return (
    <div className="start-recipe-btn-container">
      { recipeState !== 'finished' && startRecipeButton }
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipe: state.recipeDetailsReducer.recipe,
  recipeType: state.recipesReducer.recipeType,
  ingredients: state.recipeDetailsReducer.ingredients,
});

StartRecipeButton.propTypes = {
  id: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf().isRequired,
  recipeType: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default connect(mapStateToProps)(StartRecipeButton);