import React from 'react';
import ProductListItem from './ProductListItem';
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

class ConnectedProductList extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    axios.get('/api/products')
      .then(({ data }) => {
        this.props.loadList({ products: data });
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to retrieve the product list. Please try again later.');
      });
  }

  render() {
    return (
      <div>
        <h1>Our Products</h1>
        {this.props.products.map((product, index) => (
          <div>
            <ProductListItem product={product} index={index} key={index.toString()}/>
            <br></br>
          </div>
        ))}
      </div>
    );
  }
}

const ProductList = connect(mapStateToProps, mapDispatchToProps)(ConnectedProductList);

export default ProductList;