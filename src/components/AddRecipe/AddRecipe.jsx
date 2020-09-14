import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, TextField } from '@material-ui/core';
import AddIngredient from '../AddIngredient/AddIngredient.jsx'
import swal from '@sweetalert/with-react';

class AddRecipe extends Component {
  state = {
    newRecipe: {
        name: '',
        image: '',
        description: '',
        instructions: '',
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

  addName = () => {

  }

  addImage = () => {

  }

  addDescription = () => {

  }

  addInstructions = () => {

  }

  saveRecipe = () => {
    if (this.state.newRecipe.name === '' || this.state.newRecipe.image === '' || this.state.newRecipe.description === '' || this.state.newRecipe.instructions === '' ) {
        swal('Please include all fields!');
    } else {      
      console.log(this.state.newIngredient);
      this.props.dispatch({ type: 'ADD_RECIPE', payload: this.state.newRecipe})
      swal(`${this.state.newRecipe.name} was added!`, {
        buttons: false,
        timer: 1500,
      })
      this.setState({
        newRecipe: {
            name: '',
            image: '',
            description: '',
            instructions: '',
        }
      })
    }
  }

  render() {
    return (
      <>
        <div>
            {/* <AddIngredient /> */}
        </div>
        <div>
            <div className="input">
                <TextField label="Name" value={this.state.newRecipe.name} onChange = {(event) => this.handleChangeFor(event, 'name')}/>
                {/* <Button variant="contained" size="small" color="primary" onClick= {() => this.addName()}>Add</Button> */}
                {/* <Button variant="contained" size="small" color="secondary" onClick={ () => this.clearInput()}>Clear</Button> */}
            </div>
        </div>
        <div>
            <div className="input">
                <TextField label="Image" value={this.state.newRecipe.image} onChange = {(event) => this.handleChangeFor(event, 'image')}/>
                {/* <Button variant="contained" size="small" color="primary" onClick= {() => this.addImage()}>Add</Button> */}
                {/* <Button variant="contained" size="small" color="secondary" onClick={ () => this.clearInput()}>Clear</Button> */}
            </div>
        </div>
        <div>
            <div className="input">
                <TextField multiline={true} variant="outlined" fullWidth={true} size="medium" label="Description" value={this.state.newRecipe.description} onChange = {(event) => this.handleChangeFor(event, 'description')}/>
                {/* <Button variant="contained" size="small" color="primary" onClick= {() => this.addDescription()}>Add</Button> */}
                {/* <Button variant="contained" size="small" color="secondary" onClick={ () => this.clearInput()}>Clear</Button> */}
            </div>
        </div>
        <div>
            <div className="input">
                <TextField multiline={true} variant="outlined" fullWidth={true} size="medium" label="Instructions" value={this.state.newRecipe.instructions} onChange = {(event) => this.handleChangeFor(event, 'instructions')}/>
                {/* <Button variant="contained" size="small" color="primary" onClick= {() => this.addInstructions()}>Add</Button> */}
                {/* <Button variant="contained" size="small" color="secondary" onClick={ () => this.clearInput()}>Clear</Button> */}
            </div>
        </div>
        <div className="input">
            <Button variant="contained" size="medium" color="primary" onClick= {() => this.saveRecipe()}>Save Recipe!</Button>
        </div>
      </>
    );
  }
}

export default connect(mapStoreToProps)(AddRecipe);
