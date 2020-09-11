import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddIngredient from '../AddIngredient/AddIngredient.jsx'

class Pantry extends Component {
    state = {
    };

  componentDidMount() {
    console.log('App Mounted');
    this.props.dispatch({ type: 'GET_PANTRY'})
  }

  render() {
    return (
        <>
            <AddIngredient />
        </>
    );
  }
}

export default connect(mapStoreToProps)(Pantry);
