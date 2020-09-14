const fridge = (state = [], action) => {
    switch (action.type) {
        case 'SET_FRIDGE':
          return action.payload;
        case 'UNSET_USER':
          return [];
        default:
          return state;
    }
};
  

  export default fridge;
  