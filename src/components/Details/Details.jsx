import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Tooltip, Fab } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

class Details extends Component {
  state = {
      showing: false,
  };

  showInstructions = () => {
    this.setState({
        showing: !this.state.showing
    })
  }

  render() {
    const splitLines = str => str.split('  ');
    const string = splitLines(this.props.store.details.instructions)
    return (
        <div className="details">
            <h1>{this.props.store.details.name}</h1>
            <img src={this.props.store.details.image} alt={this.props.store.details.name} />
            <p>{this.props.store.details.description}</p>
            <Tooltip title="Hide Instructions">
                <Fab color="primary" onClick= {() => this.showInstructions()} >
                    { !this.state.showing ?
                    <VisibilityIcon onClick= {() => this.showInstructions()} />
                    :
                    <VisibilityOffIcon onClick= {() => this.showInstructions()} />
                    }
                </Fab>
            </Tooltip>
            { this.state.showing &&
                <div>
                { string.map((line, i) => {
                    return(
                        <p key={i}>{line}</p>
                    )
                })}
                </div>
            }
        </div>
    );
  }
}

export default connect(mapStoreToProps)(Details);
