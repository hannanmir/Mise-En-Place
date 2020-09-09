import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import RecipeListItem from '../RecipeListItem/RecipeListItem.jsx'

class RecipeList extends Component {
  state = {
      recipe: [
        {
          name: 'Nasi Ayam',
          id: 1,
          ingredients: [
              'chicken', 'rice', 'garlic', 'chiles', 'stock', 'onions'
          ],
          instructions: 'Cook the chicken!',
          description: 'Flavorful fried chicken is accompanied with a savory sweet chili sauce and served with white rice steamed in chicken stock and aromatics, with a side of chicken soup to wash it all down.',
          path: 'https://2.bp.blogspot.com/-WMRO9yUWrqg/VRelQDMYJUI/AAAAAAAAEb8/LZoeQJHw5o8/s1600/IMG_9855.JPG',
        },
        {
          name: 'Nasi Ayam',
          id: 2,
          ingredients: [
              'chicken', 'rice', 'garlic', 'chiles', 'stock', 'onions'
          ],
          instructions: 'Cook the chicken!',
          description: 'Flavorful fried chicken is accompanied with a savory sweet chili sauce and served with white rice steamed in chicken stock and aromatics, with a side of chicken soup to wash it all down.',
          path: 'https://2.bp.blogspot.com/-WMRO9yUWrqg/VRelQDMYJUI/AAAAAAAAEb8/LZoeQJHw5o8/s1600/IMG_9855.JPG',
        }
      ]
  };

  render() {
    return (
      <div className="list">
        { this.state.recipe.map((recipe) => {
          return(
            <RecipeListItem recipe={recipe} key={recipe.id}/>
          )
        })}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RecipeList);
