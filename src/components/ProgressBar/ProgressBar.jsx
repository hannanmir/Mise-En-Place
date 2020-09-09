import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

class ProgressBar extends Component {
  state = {
    progress: 0,
  };

  set0 = () => {
    this.setState({
      progress: 0
    })
  }

  set33 = () => {
    this.setState({
      progress: 33
    })
  }

  set66 = () => {
    this.setState({
      progress: 66
    })
  }

  set100 = () => {
    this.setState({
      progress: 100
    })
  }

  render() {
    return (
      <div className="progress">
        <h4>Circular Determinate</h4>
          <CircularProgress variant="static" color="secondary" value={this.state.progress} />
        <h4>Linear Determinate</h4>
          <LinearProgress variant="determinate" value={this.state.progress} />
        <button onClick={this.set33}>Set to 33%</button>
        <button onClick={this.set66}>Set to 66%</button>
        <button onClick={this.set100}>Set to 100%</button>
        <button onClick={this.set0}>Reset</button>
        <div className="card">
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ProgressBar);
