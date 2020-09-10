import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Details extends Component {
  state = {
  };

  render() {
    return (
      <>
        <h1>{this.props.store.details.name}</h1>
        <img src={this.props.store.details.image} alt={this.props.store.details.name} />
        <p>{this.props.store.details.description}</p>
      </>
    );
  }
}

export default connect(mapStoreToProps)(Details);
