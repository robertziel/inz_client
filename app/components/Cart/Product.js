import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'components/_ui-elements';

import { addOneMore, substractOneMore } from 'components/Cart/actions';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      amount: props.item.amount,
    };
    this.props = props;

    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.showInfo = this.showInfo.bind(this);
  }

  add() {
    this.props.add(this.state.item);
    this.setState(
      {
        amount: this.state.amount + 1,
      },
      () => {
        this.props.handleTotal();
      },
    );
  }

  subtract() {
    this.props.substract(this.state.item);
    this.setState(
      {
        amount: this.state.amount - 1,
      },
      () => {
        this.props.handleTotal();
      },
    );
  }

  showInfo() {
    this.props.handleShow(this.props.info);
  }

  render() {
    return (
      <div>
        <div className="row form-group">
          <div className="col-sm-10">
            <h4>{this.state.item.name}</h4>
          </div>
          <div className="col-sm-2 text-right">Amount: {this.state.amount}</div>
          <div className="col-sm-2 text-right">
            Unit price: $ {this.state.item.price}
          </div>
          <div className="col-sm-2 text-right">
            Price: $ {this.state.amount * this.state.item.price}
          </div>
        </div>
        <div className="row btn-toolbar">
          <div className="col-6 text-right">
            <Button className="btn btn-outline-primary" onClick={this.add}>
              +
            </Button>
            <Button
              className="btn btn-outline-primary"
              onClick={this.subtract}
              disabled={this.state.item.amount < 1}
            >
              -
            </Button>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    substract: item => {
      dispatch(substractOneMore(item));
    },
    add: item => {
      dispatch(addOneMore(item));
    },
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Product);
