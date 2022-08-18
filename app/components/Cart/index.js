import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Modal, Button, Paper } from 'components/_ui-elements';
import { ShoppingCart } from '@material-ui/icons';
import { getCart } from './selectors';

import Total from './Total';
import Product from './Product';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      open: false,
    };

    this.calculateTotal = this.calculateTotal.bind(this);
    this.showProduct = this.showProduct.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.calculateTotal();
  }

  calculateTotal() {
    let total = 0.0;

    Object.keys(this.props.cart).forEach(key => {
      const product = this.props.cart[key];
      console.log(product);
      total += product.price * product.amount;
    });

    this.setState({
      total,
    });
  }

  showProduct(info) {
    console.log(info);
    alert(info);
  }

  openModal() {
    this.setState(
      {
        open: true,
      },
      () => {
        this.calculateTotal();
      },
    );
  }

  closeModal() {
    this.setState({
      open: false,
    });
  }

  purchase() {
    console.log('PURCHASE');
  }

  render() {
    if (!this.props.cart) return <p>loading...!!!!</p>;

    const component = this;
    const products = Object.keys(this.props.cart).map(function(key) {
      const item = component.props.cart[key];
      return (
        <Product
          item={item}
          handleShow={component.showProduct}
          handleTotal={component.calculateTotal}
          key={item.id}
        />
      );
    });

    return (
      <div>
        <Button onClick={component.openModal}>
          <ShoppingCart /> Cart
        </Button>
        <Modal open={this.state.open}>
          <Paper>
            <Button onClick={component.closeModal}>X</Button>
            {products}
            <Total total={this.state.total} />
            <Button
              variant="contained"
              color="success"
              onClick={component.purchase}
            >
              Purchase
            </Button>
          </Paper>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createSelector(getCart(), cart => ({
  cart,
}));

export default connect(mapStateToProps)(Cart);
