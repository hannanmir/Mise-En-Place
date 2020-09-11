import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Pantry extends Component {
  state = {
  };

  componentDidMount() {
    console.log('App Mounted');
    this.props.dispatch({ type: 'GET_PANTRY', payload: this.props.store.user })
  }

  render() {
    return (
      <div>
          <p>Pantry</p>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Pantry);
