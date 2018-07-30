import callApi from '../../util/apiCaller';
import { boards } from '../../util/schema';
import { normalize } from 'normalizr';
import { createLanes } from '../Lane/LaneActions';

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

export function addBoardRequest(lane) {
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
  return  {
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
      const { boards: normalizedBoards, lanes } = normalized.entities;
      dispatch(createBoards(normalizedBoards));
      dispatch(createLanes(lanes));
    });
  };
}