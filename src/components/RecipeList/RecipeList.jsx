import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import mapStoreToProps from '../../redux/mapStoreToProps';
import RecipeListItem from '../RecipeListItem/RecipeListItem.jsx'
import { Grid } from '@material-ui/core';

class RecipeList extends Component {
  state = {
  };

  componentDidMount() {
    console.log('App Mounted');
    this.props.dispatch({ type: 'GET_RECIPES' })
    this.props.dispatch({ type: 'GET_FAVORITES' })
  }

  render() {
    return (
      <Grid 
        container 
        spacing={2}
        >
        { this.props.store.recipes.map((recipe) => {
          return(
            <Grid xs={3} item>
              <RecipeListItem recipe={recipe} key={recipe.id} />
            </Grid >
          )
        })}
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(RecipeList));
