import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, TextField } from '@material-ui/core';



class AddRecipe extends Component {
  state = {
    newRecipe: {
        name: '',
        description: '',
        instructions: '',
        image: '',
        ingredients: [],
    }
  };

  handleChangeFor = (event, propertyToChange) => {
    this.setState({
        newRecipe: {
            ...this.state.newRecipe,
            [propertyToChange]: event.target.value, 
        }
    })
  }

  handleChangeIngredient = (event) => {
      this.setState({
          newRecipe: {
              ...this.state.newRecipe,
              ingredients: [
                  ...this.state.ingriedients,
                  event
              ],
          }
      })
  }

  render() {
    return (
      <>
        <div className="input">
            <TextField id="standard-basic" label="Ingredient" onChange = {(event) => this.handleChangeIngredient(event)}/>
            <Button variant="contained" size="small" color="primary" onClick= {() => this.addIngredient()}>Add</Button>
            <Button variant="contained" size="small" color="secondary" onClick={ () => this.clearInput()}>Clear</Button>
        </div>
        <div className="input">
            <TextField id="standard-basic" label="Image" value={this.state.newRecipe.image} onChange = {(event) => this.handleChangeFor(event, 'image')}/>
            <Button variant="contained" size="small" color="primary" onClick= {() => this.addImage()}>Add</Button>
            <Button variant="contained" size="small" color="secondary" onClick={ () => this.clearInput()}>Clear</Button>
        </div>
        <div className="input">
            <TextField id="standard-basic" label="Name" value={this.state.newRecipe.name} onChange = {(event) => this.handleChangeFor(event, 'name')}/>
            <Button variant="contained" size="small" color="primary" onClick= {() => this.addName()}>Add</Button>
            <Button variant="contained" size="small" color="secondary" onClick={ () => this.clearInput()}>Clear</Button>
        </div>
        <div className="input">
            <TextField id="standard-basic" label="Description" value={this.state.newRecipe.description} onChange = {(event) => this.handleChangeFor(event, 'description')}/>
            <Button variant="contained" size="small" color="primary" onClick= {() => this.addDescription()}>Add</Button>
            <Button variant="contained" size="small" color="secondary" onClick={ () => this.clearInput()}>Clear</Button>
        </div>

      </>
    );
  }
}

export default connect(mapStoreToProps)(AddRecipe);
