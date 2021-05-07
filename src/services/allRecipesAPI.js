const MEAL_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const getAllRecipes = async (typeOfRecipe) => {
  try {
    const recipe = typeOfRecipe === 'bebidas' ? 'drinks' : 'meals';
    const request = await fetch(typeOfRecipe === 'bebidas' ? DRINK_API : MEAL_API);
    const response = await request.json();
    return response[recipe];
  } catch (error) {
    throw new Error('Falha no fetch API');
  }
};

export default getAllRecipes;