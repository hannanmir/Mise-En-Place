import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddIngredient from '../AddIngredient/AddIngredient.jsx'
import PantryListItem from '../PantryListItem/PantryListItem.jsx'
import { Typography } from '@material-ui/core';

class Pantry extends Component {
    state = {
        pantryList: [],
        fridgeList: [],
    };

  componentDidMount() {
    console.log('App Mounted');
    this.props.dispatch({ type: 'GET_PANTRY'})
    this.props.dispatch({ type: 'GET_FRIDGE'})
  }

  render() {
    return (
        <>
            <AddIngredient />
            <div className="table">
                <Typography><h4>Pantry</h4></Typography>
                <table>
                    <thead>
                        <tr>
                            <th><Typography>Ingredient</Typography></th>
                            <th><Typography>Quantity</Typography></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.store.pantry.map((ingredient) => {
                            return (
                                <PantryListItem key={ingredient.ingredient_id} ingredient={ingredient}/>
                            );
                        })}
                    </tbody>
                </table> 
            </div>
            <div className="table">
                <Typography><h4>In Fridge</h4></Typography>
                <table>
                    <thead>
                        <tr>
                            <th><Typography>Ingredient</Typography></th>
                            <th><Typography>Quantity</Typography></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.store.fridge.map((ingredient) => {
                            return (
                                <PantryListItem key={ingredient.ingredient_id} ingredient={ingredient}/>
                            );
                        })}
                    </tbody>
                </table> 
            </div>
        </>
    );
  }
}

export default connect(mapStoreToProps)(Pantry);
