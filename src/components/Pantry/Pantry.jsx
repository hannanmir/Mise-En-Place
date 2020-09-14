import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddIngredient from '../AddIngredient/AddIngredient.jsx'
import PantryListItem from '../PantryListItem/PantryListItem.jsx'

class Pantry extends Component {
    state = {
    };

  componentDidMount() {
    console.log('App Mounted');
    this.props.dispatch({ type: 'GET_PANTRY'})
  }

  render() {
    return (
        <>
            <AddIngredient />
            <div className="table">
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
        </>
    );
  }
}

export default connect(mapStoreToProps)(Pantry);
