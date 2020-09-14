import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import swal from '@sweetalert/with-react';
import { Button, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

class PantryListItem extends Component {
  state = {
    editing: false,
    newIngredient: {}
  };

  componentDidMount() {
    this.setState({
      newIngredient: this.props.ingredient
    })
    console.log(this.state.newIngredient);
  }

  handleChangeIngredient = (event, propertyToChange) => {
    this.setState({
        newIngredient: {
            ...this.state.newIngredient,
            [propertyToChange]: event.target.value,
        }
    })
  }

  deleteIngredient = (id) => {
    swal({
        title: "Are you sure?",
        text: `${this.props.ingredient.name} will be removed!`,
        icon: "warning",
        buttons: true,
    }).then((toDelete) => {
        if (toDelete) {
            swal(`${this.props.ingredient.name} has been removed!`, {
                icon: "success",
            });
            this.props.dispatch({ type: 'REMOVE_INGREDIENT', payload: id})
        } else {
            swal(`${this.props.ingredient.name} was not removed!`);
        }
    })
  }

  editIngredient = () => {
    this.setState({
      editing: true
    })
  }

  saveIngredient = () => {
    this.setState({
      editing: false
    })
    this.props.dispatch({ type: 'EDIT_INGREDIENT', payload: this.state.newIngredient})  
  }

  render() {
    if (this.state.editing) {
      return (
        <tr>
          <td>{this.props.ingredient.name}</td>
          <td><TextField value={this.state.newIngredient.quantity} onChange = {(event) => this.handleChangeIngredient(event, 'quantity')}/></td>
          <td><Button variant="contained" size="small" color="default" startIcon={<SaveIcon />} onClick={() => this.saveIngredient(this.props.ingredient.id)}>Save</Button></td>
          <td><Button variant="contained" size="small" color="secondary" startIcon={<DeleteIcon />} onClick={() => this.deleteIngredient(this.props.ingredient.id)}>Remove</Button></td>
        </tr>
      )
    } else {
      return (
        <tr>
          <td>{this.props.ingredient.name}</td>
          <td>{this.props.ingredient.quantity}</td>
          <td><Button variant="contained" size="small" color="primary" startIcon={<EditIcon />} onClick={() => this.editIngredient(this.props.ingredient.id)}>Edit</Button></td>
          <td><Button variant="contained" size="small" color="secondary" startIcon={<DeleteIcon />} onClick={() => this.deleteIngredient(this.props.ingredient.id)}>Remove</Button></td>
        </tr>
      );
    }
  }
}

export default connect(mapStoreToProps)(PantryListItem);
