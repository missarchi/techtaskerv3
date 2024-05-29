// boardReducer.js

const initialState = {
    boards: [] // Initialize boards as an empty array
  };
  
  const boardReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'DELETE_BOARD':
        // Filter out the deleted board from the state
        return {
          ...state,
          boards: state.boards.filter(board => board.id !== action.payload)
        };
      default:
        return state;
    }
  };
  
  export default boardReducer;
  