import { MOVE_LANE, ADD_BOARD, CREATE_BOARDS } from './KanbanActions';
import { CREATE_LANE, DELETE_LANE, MOVE_BETWEEN_LANES } from '../Lane/LaneActions';

function moveLanes(array, sourceLaneId, targetLaneId) {
  const sourceIndex = array.indexOf(sourceLaneId);
  const targetIndex = array.indexOf(targetLaneId);
  const arrayCopy = [...array];

  arrayCopy.splice(targetIndex, 0, arrayCopy.splice(sourceIndex, 1)[0]);
  return arrayCopy;
}

const initialState = {};
console.log(initialState);

export default function boards(state = initialState, action){
  switch (action.type) {
    case ADD_BOARD:
        return { ...state, [action.board.id]: action.board };
    case CREATE_BOARDS:
        return { ...action.boards };
    case CREATE_LANE:
        const newBoard = { ...state[action.boardId] };
        console.log(action.boardId);
        newBoard.lanes = newBoard.lanes.concat(action.lane.id);
        return { ...state, [action.boardId]: newBoard };
    case DELETE_LANE:
        const updatedBoard = { ...state[action.boardId] };
        console.log(updatedBoard);
        updatedBoard.lanes = updatedBoard.lanes.filter(laneId => laneId !== action.laneId);
        return { ...state, [action.boardId]: updatedBoard };
    case MOVE_LANE:
        const reupdatedBoard = { ...state[action.boardId] };
        reupdatedBoard.lanes = moveLanes(reupdatedBoard.lanes, action.sourceId, action.targetId);
        console.log(reupdatedBoard);
        console.log(reupdatedBoard.lanes);
    return { ...state, [action.boardId]: reupdatedBoard };
  default:
    return state;
  }
}
