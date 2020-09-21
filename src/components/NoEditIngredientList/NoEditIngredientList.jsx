import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid, Typography } from '@material-ui/core';


class NoEditIngredientList extends Component {
  state = {
  };

  render() {
    return (
        <Grid item xs={3}>
          <Typography><li>{this.props.ingredient.name} ({this.props.ingredient.quantity})</li></Typography>
        </Grid>
    );
  }
}

export default connect(mapStoreToProps)(NoEditIngredientList);
