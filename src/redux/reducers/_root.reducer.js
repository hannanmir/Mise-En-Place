import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import recipes from './recipes.reducer';
import details from './details.reducer';
import pantry from './pantry.reducer';
import fridge from './fridge.reducer';
import favorites from './favorites.reducer';
import ingredients from './ingredients.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  recipes,
  details,
  pantry,
  fridge,
  favorites,
  ingredients,
});

export default rootReducer;
