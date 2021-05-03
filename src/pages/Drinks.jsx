import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { shape } from 'prop-types';

import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBarDrink from '../components/SearchBarDrink';
import DrinksContext from '../context/DrinksContext';
import RecipeCard from '../components/RecipeCard';

export default function Drinks({ testeContext }) {
  const {
    filteredDrinks, drinkCategories, toggleCategoryFilter,
  } = useContext(testeContext || DrinksContext);

  const maxDrinks = 12;
  const maxCategories = 5;

  const drinks = filteredDrinks.slice(0, maxDrinks);
  const categories = drinkCategories.slice(0, maxCategories);

  return (
    <div>
      <Header
        title="Bebidas"
        component={ <SearchBarDrink /> }
        searchIcon
      />

      <div>
        <button
          data-testid="All-category-filter"
          onClick={ toggleCategoryFilter }
          type="button"
        >
          All
        </button>
      </div>

      {
        categories.map((category) => (
          <div key={ category }>
            <button
              data-testid={ `${category}-category-filter` }
              onClick={ toggleCategoryFilter }
              type="button"
            >
              {category}
            </button>
          </div>
        ))
      }

      {
        drinks.map((drink, index, array) => {
          const card = (
            <RecipeCard
              key={ drink.idDrink }
              recipe={ drink }
              index={ index }
            />
          );

          return array.length > 1
            ? <Link key={ drink.idDrink } to={ `/bebidas/${drink.idDrink}` }>{card}</Link>
            : card;
        })
      }

      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  testeContext: shape({}),
};

Drinks.defaultProps = {
  testeContext: undefined,
};