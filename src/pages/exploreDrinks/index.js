import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Header from '../../components/header';
// import LoadingScreen from '../loadingScreen';
// import IngredientsDrinks from '../ingredientsDrinks';

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myRandomDrink: '',
    };

    this.fetchRandomDrink = this.fetchRandomDrink.bind(this);
  }

  async fetchRandomDrink() {
    const randomDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((drink) => drink.drinks[0]);
    this.setState({
      myRandomDrink: randomDrink,
    });
  }

  render() {
    const { myRandomDrink } = this.state;
    return (
      <div>
        <Header title="Perfil" iconSearch="hidden" />
        <Link to="/explorar/bebidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        <Link to={ `/comidas/${myRandomDrink.idDrink}` }>
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
        <Footer />
      </div>
    );
  }
}

export default index;
