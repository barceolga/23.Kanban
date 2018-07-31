import callApi from '../../util/apiCaller';
import { boards, lanes, notes } from '../../util/schema';
import { normalize } from 'normalizr';
import { createLanes } from '../Lane/LaneActions';
import { createNotes } from '../Note/NoteActions';

export const ADD_BOARD = 'ADD_BOARD';
export const CREATE_BOARDS = 'CREATE_BOARDS';
export const MOVE_LANE = 'MOVE_LANE';

export function addBoard(board) {
  return {
    type: ADD_BOARD,
    board: {
      lanes: [],
      ...board,
    },
  };
}

export function addBoardRequest(board) {
  return (dispatch) => {
    return callApi('boards', 'post', board).then(res => {
      dispatch(addBoard(res));
    });
  };
}

export function createBoards(boardsData) {
  return {
    type: CREATE_BOARDS,
    boards: boardsData,
  };
}

export function moveLane(boardId, targetId, sourceId) {
  return {
    type: MOVE_LANE,
    boardId,
    sourceId,
    targetId,
  };
}

export function fetchBoards() {
  return (dispatch) => {
    return callApi('boards').then(res => {
      const normalized = normalize(res.boards, boards);
      const { boards: normalizedBoards, lanes, notes } = normalized.entities;
      dispatch(createBoards(normalizedBoards));
      dispatch(createLanes(lanes));
      dispatch(createNotes(notes));
    });
  };
}
