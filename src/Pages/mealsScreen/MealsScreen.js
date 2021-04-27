import React, { useContext } from 'react';
import CardRecipeMeal from '../../Components/CardRecipeMeal.js/CardRecipeMeal';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { RecipeContext } from '../../Context';

function MealsScreen() {
  const { recipies } = useContext(RecipeContext);
  return (
    <div>
      <h1>Pagina de comidas</h1>
      <SearchBar page="comidas" />
      {(recipies.length > 1) && recipies
        .map((recipe, index) => (index < '12')
        && <CardRecipeMeal
          recipe={ recipe }
          data-testid={ `${index}-recipe-card` }
          index={ index }
        />)}
    </div>
  );
}

export default MealsScreen;
