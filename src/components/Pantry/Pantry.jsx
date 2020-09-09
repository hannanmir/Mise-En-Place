import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Pantry extends Component {
  state = {
  };

  render() {
    return (
      <div>
          <p>Pantry</p>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Pantry);
