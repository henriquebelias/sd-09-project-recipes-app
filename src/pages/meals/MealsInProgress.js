import React, { useEffect, useState, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import { Context } from '../../context';
import { IngredientsContainer } from '../../components';
import { updateLocalStorage }
  from '../../services/localStorageService';
import { verifyItemInFavorite } from '../../services/functionsApi';
import HeaderDetails from '../../components/HeaderDetails';

function MealsInProgress() {
  const { id } = useParams();
  const { disableButton, setFavoriteRecipe, updateData, data } = useContext(Context);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const getData = async () => updateData(fetchRecipeDetails(id, true));
    setFavoriteRecipe(verifyItemInFavorite(id));
    getData();
  }, [id, setFavoriteRecipe, updateData]);

  const handleClick = () => {
    const doneRecipe = {
      id,
      type: 'comida',
      area: data.strArea,
      category: data.strCategory,
      name: data.strMeal,
      image: data.strMealThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: data.strTags.split(','),
    };
    updateLocalStorage('doneOrFavoriteRecipes', 'doneRecipes', doneRecipe);
    setShouldRedirect(true);
  };

  const { strInstructions } = data;

  if (shouldRedirect) return <Redirect to="/receitas-feitas" />;

  return (
    <section className="recipe-details">

      <HeaderDetails querys={ ['meals', 'Meal'] } isMealPage setCopy={ setCopy } />

      <IngredientsContainer data={ data } />

      <p data-testid="instructions">{strInstructions}</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        className="btn-initial"
        onClick={ handleClick }
        disabled={ disableButton }
      >
        Finalizar Receita
      </button>
      { copy && <span>Link copiado!</span> }
    </section>
  );
}

export default MealsInProgress;
