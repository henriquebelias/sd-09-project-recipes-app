import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Header from './Header';
import MainButtons from './MainButtons';
import FoodCards from './FoodCards';
import Footer from './Footer';
import MealContext from '../context/MealContext';

function MainFoods() {
  const { foods } = useContext(MealContext);

  return (
    <>
      {foods.length === 1
        ? <Redirect to={ `/comidas/${foods[0].idMeal}` } /> : null}

      <Header textProp="Comidas" />

      <MainButtons />

      <FoodCards />

      <Footer />
    </>
  );
}

export default MainFoods;