import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { addItem } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    addItem: itemID => dispatch(addItem(itemID)),
  }
};

class ConnectedProductListItem extends React.Component {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(itemID) {
    console.log('clicked', itemID);
    axios.put(`/api/cart/add/${itemID}`)
      .then(({ data }) => {
        this.props.addItem(itemID);
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to connect to the server. Please try again later.');
      });
  }

  render() {
    const { name, price, quantity, description } = this.props.product;
    return (
      <div>
        <h3>{name}</h3>
        <p>Price: ${price}</p>
        <p>Qty: {quantity}</p>
        <p>Description: {description}</p>
        <button onClick={() => this.clickHandler(this.props.index)}>Buy</button>
      </div>
    );
  }
}

const ProductListItem = connect(null, mapDispatchToProps)(ConnectedProductListItem);

export default ProductListItem;