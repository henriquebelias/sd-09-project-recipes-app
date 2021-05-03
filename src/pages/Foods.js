import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import { useRecipeContext } from '../contexts/recipeContext';
import BottomMenu from '../components/BottomMenu';
import createRender from '../utils/headerfoods';
import useHandleClickButtonName from '../hooks/useHandleClickButtonName';

function Foods() {
  const [meal, setMeal] = useState([]);
  const [listItemByCategory, setListItemByCategory] = useState([]);
  const [handleClickButtonName, category] = useHandleClickButtonName();

  const { handleFetchFoodClick,
    recipesData,
    handleFetchRecipes,
    getRecipesByCategory,
    getRecipesFoodsFilterByCategory } = useRecipeContext();

  useEffect(() => {
    if (recipesData === 'Unexpected end of JSON input'
      || recipesData.meals === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [recipesData]);

  useEffect(() => {
    handleFetchRecipes('themealdb');
  }, [handleFetchRecipes]);

  useEffect(() => {
    getRecipesByCategory('themealdb')
      .then(({ meals }) => setMeal(meals));
  }, [getRecipesByCategory]);

  useEffect(() => {
    console.log(category);
    getRecipesFoodsFilterByCategory(category)
      .then(({ meals }) => setListItemByCategory(meals || []));
  }, [category]);

  function categoryButtom() {
    const five = 5;
    return (
      meal.map(({ strCategory }, index) => (
        index < five && (
          <div className="categoty-btn">
            <button
              key={ strCategory }
              type="button"
              name={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ ({ target }) => handleClickButtonName({ target }) }
            >
              { strCategory }
            </button>
          </div>
        )
      ))
    );
  }

  function header() {
    return (
      <>
        <HeaderFoods hassearchbar>
          <h1 data-testid="page-title">Comidas</h1>
        </HeaderFoods>
        <SearchBar>
          <button
            onClick={ () => { handleFetchFoodClick(); } }
            data-testid="exec-search-btn"
            type="button"
          >
            Buscar
          </button>
        </SearchBar>
        {categoryButtom() }
        { listItemByCategory.length
          ? createRender(listItemByCategory)
          : (recipesData.meals && (createRender(recipesData.meals))) }
        <BottomMenu />
      </>
    );
  }

  if (recipesData.meals) {
    const mealId = recipesData.meals.map(({ idMeal }) => idMeal);
    return recipesData.meals.length === 1 ? (<Redirect to={ `/comidas/${mealId}` } />)
      : header();
  }

  return (
    header()
  );
}

export default Foods;