const recipes = (state = [], action) => {
    switch (action.type) {
        case 'SET_PANTRY':
          return action.payload;
        case 'UNSET_USER':
          return [];
        default:
          return state;
    }
};
  

  export default recipes;
  