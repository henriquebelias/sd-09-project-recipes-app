import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import { updateLocalStorage } from '../../services/localStorageService';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';

function MealsInProgress() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    const getData = async () => setData(await fetchRecipeDetails(id, true));
    getData();
  }, [id]);

  const checkBoxClick = () => {
    const allCheked = document.querySelectorAll('input[type=checkbox]');
    const ingredients = [];
    allCheked.forEach((checkbox) => {
      if (checkbox.checked) {
        ingredients.push(checkbox.parentElement.parentElement.innerText);
      }
    });
    updateLocalStorage('inProgressRecipes', 'meals', id, ingredients);
    if (allCheked.length === ingredients.length) setDisableButton(false);
    else setDisableButton(true);
  };

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
    updateLocalStorage('doneRecipes', 'doneRecipes', doneRecipe);
    setShouldRedirect(true);
  };

  const ingredients = Object.keys(data).filter((el) => el.includes('strIngredient'));
  const measures = Object.keys(data).filter((el) => el.includes('strMeasure'));
  const { strMealThumb, strMeal, strCategory, strInstructions } = data;

  if (shouldRedirect) return <Redirect to="/receitas-feitas" />;

  return (
    <section className="recipe-details">
      <img data-testid="recipe-photo" src={ strMealThumb } alt="recipe" />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favorite icon" />
      </button>
      <p data-testid="recipe-category">{ strCategory }</p>
      { ingredients.map((ingredient, index) => (
        data[ingredient] && data[ingredient].length ? (
          <label
            htmlFor={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ ingredient }
          >
            { `${data[ingredient]} ${data[measures[index]]}` }
            <span data-testid={ `${index}-ingredient-step` }>
              <input
                id={ ingredient }
                value={ ingredient }
                type="checkbox"
                onClick={ checkBoxClick }
              />
            </span>
          </label>) : false
      )) }
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
    </section>
  );
}

export default MealsInProgress;