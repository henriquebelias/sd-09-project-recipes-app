const getDrinksAll = async () => {
  try {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endpoint);
    const drinks = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

const getDrinksByCategory = async (category) => {
  try {
    const filterEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
    const response = await fetch(`${filterEndpoint}${category}`);
    const drinks = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

const getDrinksCategories = async () => {
  try {
    const categoriesEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(categoriesEndpoint);
    const drinksCategories = await response.json();
    return drinksCategories;
  } catch (error) {
    console.log(error);
  }
};

const getDrinksByName = async (name) => {
  try {
    const filterEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(`${filterEndpoint}${name}`);
    const drinks = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

const getDrinksByIngredient = async (ingredient) => {
  try {
    const filterEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
    const response = await fetch(`${filterEndpoint}${ingredient}`);
    const drinks = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

const getDrinksByFirstLetter = async (firstLetter) => {
  try {
    const filterEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
    const response = await fetch(`${filterEndpoint}${firstLetter}`);
    const drinks = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

const getRandomDrink = async () => {
  try {
    const randomEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const data = await fetch(randomEndpoint);
    const result = await data.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getDrinkById = async (id) => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const result = await fetch(url);
    return await result.json();
  } catch (error) {
    console.log(error);
  }
};

const getDrinksIngredientsList = async () => {
  try {
    const ingredientsEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const data = await fetch(ingredientsEndpoint);
    const result = await data.json();
    return result.drinks;
  } catch (error) {
    console.log(error);
  }
};

const getDrinkIngredientThumbnail = async (drink) => {
  try {
    const ingredientsEndpoint = `https://www.thecocktaildb.com/images/ingredients/${drink}-Small.png`;
    const data = await fetch(ingredientsEndpoint);
    const result = await data.blob();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export {
  getDrinkById,
  getDrinksAll,
  getRandomDrink,
  getDrinksByName,
  getDrinksByCategory,
  getDrinksCategories,
  getDrinksByIngredient,
  getDrinksByFirstLetter,
  getDrinksIngredientsList,
  getDrinkIngredientThumbnail,
};