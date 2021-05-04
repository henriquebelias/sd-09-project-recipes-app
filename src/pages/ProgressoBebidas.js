import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router';
import copy from 'clipboard-copy';
import CheckBoxProgress from '../components/CheckboxProgress';
import { AppContext } from '../context/AppContext';
import { getDrinkIdDetails } from '../services';
import shareImg from '../images/shareIcon.svg';
import whiteHeartImg from '../images/whiteHeartIcon.svg';
import blackHeartImg from '../images/blackHeartIcon.svg';

const checkFavorite = (favoriteRecipes, recipeId) => {
  if (favoriteRecipes.find((recipe) => recipe.id === recipeId)) return true;
  return false;
};

const ProgressoBebidas = () => {
  const [stepsFinished, setStepsFinished] = useState(1);
  const [idDetails, setIdDetails] = useState([]);
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [linkShared, setLinkShared] = useState(false);

  const {
    favoriteRecipe,
    removeFromFavorite,
    finishRecipe,
    handleProgressRecipes,
    handleIngredientsUsed,
    favoriteRecipes,
  } = useContext(AppContext);

  let stepsLimit = 1;
  const getIngredients = () => {
    const ingredients = Object.entries(idDetails).filter((details) => {
      const condition1 = details[0].includes('Ingredient');
      const condition2 = details[1] !== '' && details[1] !== null;
      return condition1 && condition2;
    });
    const measure = Object.entries(idDetails)
      .filter((details) => details[0].includes('Measure'));
    const ingredientsArray = ingredients.reduce((acc, curr, index) => {
      acc.push({ name: curr[1], index });
      return acc;
    }, []);
    const measuresArray = measure.reduce((acc, curr, index) => {
      acc.push({ measure: curr[1], index });
      return acc;
    }, []);
    return ingredientsArray.map((ingredient) => {
      const measurament = measuresArray
        .filter((quantity) => ingredient.index === quantity.index);
      return { name: ingredient.name, measure: measurament[0].measure };
    });
  };
  const fetchDetails = async (identification) => {
    const results = await getDrinkIdDetails(identification);
    setIdDetails(results);
  };
  const handleShare = () => {
    const { idDrink } = idDetails;
    copy(`http://localhost:3000/bebidas/${idDrink}`);
    setLinkShared(true);
  };

  const handleFavorite = () => {
    const { idDrink, strDrink, strAlcoholic, strCategory, strDrinkThumb } = idDetails;
    if (!checkFavorite(favoriteRecipes, idDrink)) {
      favoriteRecipe({
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      });
    } else {
      removeFromFavorite(idDrink);
    }
  };

  const handleFinishRecipe = () => {
    const {
      strDrinkThumb,
      strDrink, strCategory, idDrink, strAlcoholic } = idDetails;
    const doneInfos = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: new Date().toLocaleDateString('pt-BR'),
      tags: [],
    };
    finishRecipe(doneInfos);
    setRedirect(true);
  };

  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  if (!idDetails) return <p>Carregando...</p>;
  const { strDrinkThumb,
    strDrink, strCategory, strInstructions, idDrink } = idDetails;

  return (
    <div>
      <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <button type="button" onClick={ () => handleShare() }>
        <img data-testid="share-btn" src={ shareImg } alt="Compartilhar" />
      </button>
      { linkShared && <p>Link copiado!</p> }
      <button type="button" onClick={ handleFavorite }>
        <img
          data-testid="favorite-btn"
          src={ checkFavorite(favoriteRecipes, idDrink) ? blackHeartImg : whiteHeartImg }
          alt="Favoritas"
        />
      </button>
      <p data-testid="recipe-category">{strCategory}</p>
      <div className="ingredient-steps">
        { idDetails && getIngredients().map((ingredient, index) => {
          stepsLimit += 1;
          return (
            <CheckBoxProgress
              ingredient={ ingredient }
              index={ index }
              key={ index }
              setStepsFinished={ setStepsFinished }
              stepsFinished={ stepsFinished }
              ingredientsUsed={ handleIngredientsUsed }
              inProgressRecipe={ handleProgressRecipes }
              idRecipe={ idDrink }
              type="cocktails"
            />
          );
        }) }
      </div>
      <p data-testid="instructions">{strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ stepsFinished < stepsLimit }
        onClick={ handleFinishRecipe }
      >
        Finalizar Receita
      </button>
      {redirect ? <Redirect to="/receitas-feitas" /> : null}
    </div>
  );
};

export default ProgressoBebidas;
