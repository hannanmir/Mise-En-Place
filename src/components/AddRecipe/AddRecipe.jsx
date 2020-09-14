import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, TextField } from '@material-ui/core';
import AddIngredient from '../AddIngredient/AddIngredient.jsx'

class AddRecipe extends Component {
  state = {
    newRecipe: {
        name: '',
        description: '',
        instructions: '',
        image: '',
    },
  };

  handleChangeFor = (event, propertyToChange) => {
    this.setState({
        newRecipe: {
            ...this.state.newRecipe,
            [propertyToChange]: event.target.value, 
        }
    })
  }

  clearInput = () => {
    console.log(this.state.ingredients);
  }

  addImage = () => {

  }

  addName = () => {

  }

  addDescription = () => {

  }

  render() {
    return (
      <>
        <div>
            <AddIngredient />
        </div>
        <div>
            <div className="input">
                <TextField label="Image" value={this.state.newRecipe.image} onChange = {(event) => this.handleChangeFor(event, 'image')}/>
                <Button variant="contained" size="small" color="primary" onClick= {() => this.addImage()}>Add</Button>
                <Button variant="contained" size="small" color="secondary" onClick={ () => this.clearInput()}>Clear</Button>
            </div>
        </div>
        <div>
            <div className="input">
                <TextField label="Name" value={this.state.newRecipe.name} onChange = {(event) => this.handleChangeFor(event, 'name')}/>
                <Button variant="contained" size="small" color="primary" onClick= {() => this.addName()}>Add</Button>
                <Button variant="contained" size="small" color="secondary" onClick={ () => this.clearInput()}>Clear</Button>
            </div>
        </div>
        <div>
            <div className="input">
                <TextField multiline={true} variant="outlined" fullWidth={true} size="medium" label="Description" value={this.state.newRecipe.description} onChange = {(event) => this.handleChangeFor(event, 'description')}/>
                <Button variant="contained" size="small" color="primary" onClick= {() => this.addDescription()}>Add</Button>
                <Button variant="contained" size="small" color="secondary" onClick={ () => this.clearInput()}>Clear</Button>
            </div>
        </div>
      </>
    );
  }
}

export default connect(mapStoreToProps)(AddRecipe);
