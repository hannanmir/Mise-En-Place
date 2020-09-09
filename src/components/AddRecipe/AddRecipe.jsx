import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class AddRecipe extends Component {
  state = {
  };

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddRecipe);
