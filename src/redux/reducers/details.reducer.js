const details = (state = {}, action) => {
    switch (action.type) {
        case 'WHICH_RECIPE':
          return action.payload;
        case 'UNSET_USER':
          return {};
        default:
            console.log(state);
          return state;
    }
};
  
export default details;
  