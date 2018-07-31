import callApi from '../../util/apiCaller';
import { lanes, boards } from '../../util/schema';
import { normalize } from 'normalizr';
import { createNotes } from '../Note/NoteActions';

// Export Constants

export const CREATE_LANE = 'CREATE_LANE';
export const CREATE_LANES = 'CREATE_LANES';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const EDIT_LANE = 'EDIT_LANE';
export const MOVE_BETWEEN_LANES = 'MOVE_BETWEEN_LANES';

// Export Actions

export function createLane(lane, boardId) {
  return {
    type: CREATE_LANE,
    boardId,
    lane: {
      notes: [],
      ...lane,
    },
  };
}

export function createLaneRequest(lane, boardId) {
  return (dispatch) => {
    return callApi('lanes', 'post', { lane, boardId }).then(laneResp => {
      dispatch(createLane(laneResp, boardId));
    });
  };
}

export function createLanes(lanesData) {
  return {
    type: CREATE_LANES,
    lanes: lanesData,
  };
}

export function updateLane(lane) {
  return {
    type: UPDATE_LANE,
    lane,
  };
}

export function deleteLane(laneId, boardId) {
  return {
    type: DELETE_LANE,
    laneId,
    boardId,
  };
}
export function deleteLaneRequest(laneId, boardId) {
  return (dispatch) => {
    return callApi(`lanes/${laneId}`, 'delete', { boardId }).then(() => {
      dispatch(deleteLane(laneId, boardId));
    });
  };
}
export function editLane(laneId) {
  return {
    type: EDIT_LANE,
    laneId,
  };
}

export function updateLaneRequest(lane) {
  return dispatch => {
    return callApi(`lanes/${lane.id}`, 'put', { name: lane.name }).then(() => {
      dispatch(updateLane(lane));
    });
  };
}

export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes').then(res => {
      const normalized = normalize(res.lanes, lanes);
      const { lanes: normalizedLanes, notes } = normalized.entities;
      dispatch(createLanes(normalizedLanes));
      dispatch(createNotes(notes));
    });
  };
}

export function moveBetweenLanes(targetLaneId, noteId, sourceLaneId) {
  return {
    type: MOVE_BETWEEN_LANES,
    targetLaneId,
    noteId,
    sourceLaneId,
  };
}
