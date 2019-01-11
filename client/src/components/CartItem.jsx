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
    this.state = {
      qty: 1
    }
    this.clickHandlerAdd = this.clickHandlerAdd.bind(this);
    this.clickHandlerReduce = this.clickHandlerReduce.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clickHandlerRemove = this.clickHandlerRemove.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.setState({ qty: this.props.qty });
  }

  clickHandlerAdd(itemID) {
    this.setState({ qty: this.state.qty + 1 });
    axios.put(`/api/cart/add/${itemID}`)
      .then(({ data }) => {
        console.log(data);
        this.props.addItem(itemID);
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to connect to the server. Please try again later.');
      });
  }
  clickHandlerReduce(itemID) {
    this.setState({ qty: this.state.qty - 1 });
    axios.put(`/api/cart/reduce/${itemID}`)
      .then(({ data }) => {
        console.log(data);
        this.props.reduceItem(itemID);
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to connect to the server. Please try again later.');
      });
  }
  handleChange(itemID, num) {
    axios.put(`/api/cart/change/${itemID}`, { num })
      .then(({ data }) => {
        console.log(data);
        this.props.changeItem(itemID, num);
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to connect to the server. Please try again later.');
      });
  }
  clickHandlerRemove(itemID) {
    axios.delete(`/api/cart/remove/${itemID}`)
      .then(({ data }) => {
        console.log(data);
        this.props.removeItem(itemID);
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to connect to the server. Please try again later.');
      });
  }

  handleInput(e) {
    this.setState({ qty: e.target.value }, () => {
      if (this.state.qty !== '') {
        this.handleChange(this.props.itemID, +this.state.qty);
      }
    });
  }

  render() {
    const itemID = this.props.itemID;
    const name = this.props.name;
    return (
      <div>
        <button onClick={() => this.clickHandlerRemove(itemID)}>x</button>
        {name}:
        <button onClick={() => this.clickHandlerReduce(itemID)}>-</button>
        <input onInput={this.handleInput} value={this.state.qty} size="5"/>
        <button onClick={() => this.clickHandlerAdd(itemID)}>+</button>
      </div>
    );
  }
}

const CartItem = connect(null, mapDispatchToProps)(ConnectedCartItem);

export default CartItem;