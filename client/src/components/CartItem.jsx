import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { addItem, reduceItem, changeItem, removeItem } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    addItem: itemID => dispatch(addItem(itemID)),
    reduceItem: itemID => dispatch(reduceItem(itemID)),
    changeItem: ( itemID, num ) => dispatch(changeItem(itemID, num)),
    removeItem: itemID => dispatch(removeItem(itemID)),
  }
};

class ConnectedCartItem extends React.Component {
  constructor() {
    super();
    this.clickHandlerAdd = this.clickHandlerAdd.bind(this);
    this.clickHandlerReduce = this.clickHandlerReduce.bind(this);
    this.clickHandlerChange = this.clickHandlerChange.bind(this);
    this.clickHandlerRemove = this.clickHandlerRemove.bind(this);
  }

  clickHandlerAdd(itemID) {
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
  clickHandlerReduce(itemID) {
    console.log('clicked', itemID);
    axios.put(`/api/cart/reduce/${itemID}`)
      .then(({ data }) => {
        this.props.reduceItem(itemID);
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to connect to the server. Please try again later.');
      });
  }
  clickHandlerChange(itemID, num) {
    console.log('clicked', itemID);
    axios.put(`/api/cart/change/${itemID}`)
      .then(({ data }) => {
        this.props.changeItem(itemID, num);
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to connect to the server. Please try again later.');
      });
  }
  clickHandlerRemove(itemID) {
    console.log('clicked', itemID);
    axios.put(`/api/cart/remove/${itemID}`)
      .then(({ data }) => {
        this.props.removeItem(itemID);
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to connect to the server. Please try again later.');
      });
  }

  render() {
    const itemID = this.props.itemID;
    const qty = this.props.qty;
    const name = this.props.name;
    return (
      <div>
        <button onClick={() => this.clickHandlerRemove(itemID)}>x</button>
        {name}:
        <button onClick={() => this.clickHandlerReduce(itemID)}>-</button>
        <input value={qty} />
        <button onClick={() => this.clickHandlerAdd(itemID)}>+</button>
      </div>
    );
  }
}

const CartItem = connect(null, mapDispatchToProps)(ConnectedCartItem);

export default CartItem;