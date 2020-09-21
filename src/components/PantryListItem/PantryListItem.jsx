import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import swal from '@sweetalert/with-react';
import { TextField, Tooltip, IconButton, TableCell, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

class PantryListItem extends Component {
  state = {
    editing: false,
    newIngredient: this.props.ingredient
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
      return (
        <TableRow>
          <TableCell>{this.state.newIngredient.name}</TableCell>
          { this.state.editing ?
            <TableCell><TextField size="small" value={this.state.newIngredient.quantity} onChange = {(event) => this.handleChangeIngredient(event, 'quantity')}/></TableCell>
          :
            <TableCell>{this.state.newIngredient.quantity}</TableCell>
          }
          { this.state.editing ?
            <TableCell>
              <Tooltip title="Save" >
                <IconButton onClick={() => this.saveIngredient(this.props.ingredient.id)} >
                    <SaveIcon /> 
                </IconButton>
              </Tooltip>
            </TableCell>
          :
            <TableCell>
              <Tooltip title="Edit" >
                <IconButton onClick={() => this.editIngredient(this.props.ingredient.id)} >
                    <EditIcon color="primary" /> 
                </IconButton>
              </Tooltip>
            </TableCell>
          }
            <TableCell>
              <Tooltip title="Delete" >
                <IconButton onClick={() => this.deleteIngredient(this.props.ingredient.ingredient_id)} >
                    <DeleteIcon color="error" /> 
                </IconButton>
              </Tooltip>
            </TableCell>
        </TableRow>
      )
  }
}

export default connect(mapStoreToProps)(PantryListItem);
