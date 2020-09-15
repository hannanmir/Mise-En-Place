import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import mapStoreToProps from '../../redux/mapStoreToProps';
import RecipeListItem from '../RecipeListItem/RecipeListItem.jsx'


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
      <div className="list">
        { this.props.store.recipes.map((recipe) => {
          return(
            <RecipeListItem recipe={recipe} key={recipe.id} />
          )
        })}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(RecipeList));
