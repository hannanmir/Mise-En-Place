import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class IngredientList extends Component {
  state = {
  };

  render() {
    return (
        <li>{this.props.ingredient.name} ({this.props.ingredient.quantity})</li>
    );
  }
}

export default connect(mapStoreToProps)(IngredientList);
