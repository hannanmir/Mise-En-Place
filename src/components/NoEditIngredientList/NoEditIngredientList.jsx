import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid } from '@material-ui/core';


class NoEditIngredientList extends Component {
  state = {
  };

  render() {
    return (
      <Grid item xs={3}>
        <li>{this.props.ingredient.name} ({this.props.ingredient.quantity})</li>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(NoEditIngredientList);
