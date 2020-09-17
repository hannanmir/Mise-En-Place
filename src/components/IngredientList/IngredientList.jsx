import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import swal from '@sweetalert/with-react';
import { TextField, Tooltip, IconButton } from '@material-ui/core';

class IngredientList extends Component {
    state = {
        editing: false,
        newIngredient: {
            ...this.props.ingredient,
            recipe_id: this.props.store.details.id,
        }
    };
    
      handleChangeIngredient = (event, propertyToChange) => {
        this.setState({
            newIngredient: {
                ...this.state.newIngredient,
                [propertyToChange]: event.target.value,
            }
        })
      }
    
      deleteIngredient = (test) => {
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
                console.log('test', this.state.newIngredient);
                this.props.dispatch({ type: 'REMOVE_RECIPE_INGREDIENT', payload: test})
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
        this.props.dispatch({ type: 'EDIT_RECIPE_INGREDIENT', payload: this.state.newIngredient})
      }

  render() {
    return (
        <li>
            <>{this.props.ingredient.name} </>
            { this.state.editing ?
            <TextField value={this.state.newIngredient.quantity} onChange = {(event) => this.handleChangeIngredient(event, 'quantity')}/>
            :
            <>({this.props.ingredient.quantity})</>
            }
            { this.state.editing ?
                <Tooltip title="Save" >
                <IconButton onClick={() => this.saveIngredient(this.props.ingredient.id)} >
                    <SaveIcon /> 
                </IconButton>
                </Tooltip>
            :
                <Tooltip title="Edit" >
                <IconButton onClick={() => this.editIngredient(this.props.ingredient.id)} >
                    <EditIcon color="primary" /> 
                </IconButton>
                </Tooltip>
            }
                <Tooltip title="Delete" >
                <IconButton onClick={() => this.deleteIngredient(this.state.newIngredient)} >
                    <DeleteIcon color="secondary" /> 
                </IconButton>
                </Tooltip>
        </li>
    );
  }
}

export default connect(mapStoreToProps)(IngredientList);
