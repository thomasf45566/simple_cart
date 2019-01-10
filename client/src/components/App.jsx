import React from 'react';
import ProductList from './ProductList';
import Cart from './Cart';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showProducts: true 
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState({ showProducts: !this.state.showProducts });
  }

  render() {
    return (
      <div>
        <h1>Simple Cart</h1>
        <button onClick={this.clickHandler}>Go To {this.state.showProducts ? 'Cart' : 'Products'}</button>
        {this.state.showProducts ? <ProductList /> : <Cart />}
      </div>
    );
  }
}

export default App;