const ingredients = (state = [], action) => {
    switch (action.type) {
        case 'SET_INGREDIENTS':
          return action.payload;
        case 'RESET_INGREDIENTS':
          return [];
        case 'UNSET_USER':
          return [];
        default:
          return state;
    }
};
  

  export default ingredients;
  