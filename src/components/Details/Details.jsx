import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

class Details extends Component {
  state = {
      showing: false
  };

  showInstructions = () => {
    this.setState({
        showing: !this.state.showing
    })
  }

  render() {
    if (this.state.showing) {
        return (
            <>
              <h1>{this.props.store.details.name}</h1>
              <img src={this.props.store.details.image} alt={this.props.store.details.name} />
              <p>{this.props.store.details.description}</p>
              <Button variant="contained" size="small" color="primary" startIcon={<VisibilityOffIcon />} onClick={() => this.showInstructions()}>Instructions</Button>
              <p>{this.props.store.details.instructions}</p>

            </>
        );
    } else {
        return (
            <>
                <h1>{this.props.store.details.name}</h1>
                <img src={this.props.store.details.image} alt={this.props.store.details.name} />
                <p>{this.props.store.details.description}</p>
                <Button variant="contained" size="small" color="primary" startIcon={<VisibilityIcon />} onClick={() => this.showInstructions()}>Instructions</Button>
            </>
        );
    }
  }
}

export default connect(mapStoreToProps)(Details);
