import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

const ListRecipes = () => {
  const pathName = useLocation().pathname.split('/');
  const { recipes } = useContext(RecipesContext);
  const rowsTolist = 12;
  const arrayRecipes = [];
  let endOfList;

  if (recipes.length >= rowsTolist) {
    endOfList = rowsTolist;
  } else {
    endOfList = recipes.length;
  }

  for (let index = 0; index < endOfList; index += 1) {
    if (pathName[1] === 'comidas') {
      arrayRecipes.push({
        id: recipes[index].idMeal,
        thumb: recipes[index].strMealThumb,
        title: recipes[index].strMeal,
      });
    } else {
      arrayRecipes.push({
        id: recipes[index].idDrink,
        thumb: recipes[index].strDrinkThumb,
        title: recipes[index].strDrink,
      });
    }
  }

  return (
    <div>
      { arrayRecipes.map((recipe, index) => (
        <Link to={ `/${pathName[1]}/${recipe.id}` } key={ recipe.id }>
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.thumb }
              alt={ recipe.title }
            />
            <h4 data-testid={ `${index}-card-name` }>{ recipe.title }</h4>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListRecipes;
