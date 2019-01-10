import React from 'react';
import CartItem from './CartItem';
import axios from 'axios';
import { connect } from "react-redux";
import { loadList } from '../actions';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    loadList: list => dispatch(loadList(list)),
  }
};

class ConnectedCart extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    axios.get('/api/cart')
      .then(({ data }) => {
        this.props.loadList({ cart: data });
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to retrieve your cart. Please try again later.');
      });
  }

  render() {
    const cart = this.props.cart;
    return (
      <div>
        <h1>Your Cart</h1>
        {Object.keys(cart).map((itemID, index) => (
          <CartItem itemID={itemID} name={this.props.products[itemID].name} qty={cart[itemID]}  key={index} />
        ))}
      </div>
    );
  }
}

const Cart = connect(mapStateToProps, mapDispatchToProps)(ConnectedCart);

export default Cart;