import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { fetchExplreDrinksRadom } from '../services/ApiRequest';
import '../Styles/ExploreDrinksOrMeals.css';

class ExploreDrink extends React.Component {
  constructor() {
    super();
    this.state = {
      drinks: {},
    };
  }

  componentDidMount() {
    fetchExplreDrinksRadom()
      .then(({ drinks }) => (
        this.setState({ drinks: drinks[0] })
      ));
  }

  render() {
    const { drinks } = this.state;
    return (
      <div className="exploreContainer">
        <Header name="Explorar Bebidas" />
        <div className="linksContainer">
          <Link to="/explorar/bebidas/ingredientes">
            <button
              data-testid="explore-by-ingredient"
              type="button"
            >
              Por Ingredientes
            </button>
          </Link>

          <Link to="/explorar/bebidas/area">
            <button
              data-testid="explore-by-area"
              type="button"
            >
              Por Local de Origem
            </button>
          </Link>

          <Link to={ `/bebidas/${drinks.idDrink}` }>
            <button data-testid="explore-surprise" type="button">Me Surpreenda!</button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ExploreDrink;
