import React from 'react';
import CartItem from './CartItem';
import Checkout from './Checkout';
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
    this.state = {
      total: 0
    }
    this.setTotal = this.setTotal.bind(this);
  }

  componentDidMount() {
    axios.get('/api/cart')
      .then(({ data }) => {
        this.props.loadList({ cart: data });
        this.setTotal();
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to retrieve your cart. Please try again later.');
      });
  }

  setTotal() {
    let total = Object.keys(this.props.cart).reduce((total, itemID) => (
      total + this.props.products[itemID].price * this.props.cart[itemID]
    ), 0);
    this.setState({ total: total });
  }

  render() {
    const cart = this.props.cart;
    const products = this.props.products;
    return (
      <div>
        <h1>Your Cart</h1>
        {Object.keys(cart).map((itemID, index) => (
          <CartItem itemID={itemID} name={products[itemID].name} qty={cart[itemID]} setTotal={this.setTotal} key={index.toString()} />
        ))}
        <br></br>
        <Checkout total={this.state.total} />
      </div>
    );
  }
}

const Cart = connect(mapStateToProps, mapDispatchToProps)(ConnectedCart);

export default Cart;