import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Details extends Component {
  state = {
  };

  render() {
    return (
      <div>
          <h4>Details</h4>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Details);
