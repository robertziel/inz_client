import ReactDOM from 'react-dom';
import React, { Component } from 'react';

export default class Total extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const total = this.props.total.toFixed(2);
    const tax = (this.props.total * 0.15).toFixed(2);
    const totalIncTax = (+total + +tax).toFixed(2);
    const mystyle = {
      borderTop: '1px solid #ddd',
      marginTop: '10px',
    };
    return (
      <div
        style={{
          marginTop: '30px',
          backgroundColor: '#F6F6F6',
          padding: '10px',
        }}
      >
        <h3 className="row" style={{ fontWeight: 400 }}>
          <span className="col-6">total price:</span>
          <span className="col-6 text-right">$ {total}</span>
        </h3>
        <h3 className="row" style={{ fontWeight: 400 }}>
          <span className="col-6">tax (15%):</span>
          <span className="col-6 text-right">$ {tax}</span>
        </h3>
        <h3 className="row" style={mystyle}>
          <span className="col-6">tota inc tax:</span>
          <span className="col-6 text-right">$ {totalIncTax}</span>
        </h3>
      </div>
    );
  }
}
