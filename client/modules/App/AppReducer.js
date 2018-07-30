// Import Actions
import { TOGGLE_ADD_BOARD} from './AppActions';

// Initial State
const initialState = {
  showAddBoard: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_BOARD:
      return {
        showAddBoard: !state.showAddBoard,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddBoard
export const getShowAddBoard = state => state.app.showAddBoard;

// Export Reducer
export default AppReducer;
