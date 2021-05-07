import React from 'react';
import { connect } from 'react-redux';
import { objectOf, string } from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';
import RecipeMealCard from '../components/RecipeMealCard';
import { defaultFetchApiAction, setIsLoading } from '../actions';
import CategoriesList from '../components/CategoriesList';

class Meals extends React.Component {
  componentDidMount() {
    const { defaultFetchApi, setIsLoadingToTrue } = this.props;
    setIsLoadingToTrue();
    defaultFetchApi();
  }

  render() {
    const { recipes, isLoading, isCategory } = this.props;
    const searchIcon = true;
    const pathName = window.location.pathname;
    const mxmItens = 12;
    const itens = recipes && recipes.filter((_, index) => index < mxmItens);
    const idType = (pathName === '/comidas') ? 'idMeal' : 'idDrink';
    if (isLoading === true) return <p>Loading...</p>;
    if (recipes === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    return (
      <div>
        <Header title="Comidas" searchIcon={ searchIcon } />
        <CategoriesList />
        {itens && !isCategory && itens.length === 1
          && <Redirect to={ `${pathName}/${itens[0][idType]}` } /> }
        {itens && itens.map((meal, index) => (
          <Link
            to={ `${pathName}/${itens[index][idType]}` }
            key={ meal[idType] }
          >
            <RecipeMealCard meal={ meal } index={ index } />
          </Link>))}
        <FooterMenu />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.searchInputReducer.recipes,
  isLoading: state.searchInputReducer.isLoading,
  isCategory: state.searchInputReducer.isCategory,
});

const mapDispatchToProps = (dispatch) => ({
  defaultFetchApi: () => dispatch(defaultFetchApiAction()),
  setIsLoadingToTrue: () => dispatch(setIsLoading()),
});

Meals.propTypes = {
  recipes: objectOf,
  searchIcon: string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Meals);