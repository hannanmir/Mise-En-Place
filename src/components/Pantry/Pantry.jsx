import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddIngredient from '../AddIngredient/AddIngredient.jsx'
import PantryListItem from '../PantryListItem/PantryListItem.jsx'

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
                <h4>Pantry</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Ingredient</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.store.pantry.map((ingredient) => {
                            return (
                                <PantryListItem key={ingredient.id} ingredient={ingredient}/>
                            );
                        })}
                    </tbody>
                </table> 
            </div>
            <div className="table">
                <h4>In Fridge</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Ingredient</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.store.fridge.map((ingredient) => {
                            return (
                                <PantryListItem key={ingredient.id} ingredient={ingredient}/>
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
