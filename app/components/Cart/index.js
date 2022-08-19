import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import StoreAccessor from 'containers/BackendApiConnector/StoreAccessor';
import FontAwesome from 'react-fontawesome';
import { Link } from "react-router-dom";

import { Modal, Button, Paper } from 'components/_ui-elements';
import { getCart } from './selectors';
import Wrapper from './Wrapper';
import { mustSignInNotify } from './notifications';

import Total from './Total';
import Product from './Product';
import CartForm from './CartForm';

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

  render() {
    const isSignedIn = StoreAccessor.store.getState().backendApiConnector.authenticationToken == null;

    if (isSignedIn) {
      return (
        <Wrapper><Link to="/sign-in"><Button onClick={mustSignInNotify} navbar><FontAwesome name="shopping-cart" /></Button></Link></Wrapper>
      );
    }

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
      <Wrapper>
        <Button navbar onClick={component.openModal}>
          <FontAwesome name="shopping-cart" />
        </Button>
        <Modal open={this.state.open}>
          <Paper>
            <Button onClick={component.closeModal}>X</Button>
            {products}
            <Total total={this.state.total} />
            <CartForm />
          </Paper>
        </Modal>
      </Wrapper>
    );
  }
}

const mapStateToProps = createSelector(getCart(), cart => ({
  cart,
}));

export default connect(mapStateToProps)(Cart);
