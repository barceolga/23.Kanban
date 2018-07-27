
// Import Actions
import { CREATE_LANE, CREATE_LANES, UPDATE_LANE, DELETE_LANE, EDIT_LANE } from './LaneActions';
import { CREATE_NOTE, DELETE_NOTE } from '../Note/NoteActions.js';

import omit from 'lodash/omit';

// Initial State
const initialState = {};

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case CREATE_LANE:
    case UPDATE_LANE:
          return { ...state, [action.lane.id]: action.lane };
    case CREATE_LANES:
        return { ...action.lanes };
    case DELETE_LANE:
        return omit(state, action.laneId);
    case CREATE_NOTE:
        const newLane = { ...state[action.laneId] };
        newLane.notes = newLane.notes.concat(action.note.id);
        return { ...state, [action.laneId]: newLane };
    case DELETE_NOTE:
        const updatedLane = { ...state[action.laneId] };
        updatedLane.notes = updatedLane.notes.filter(noteId => noteId !== action.noteId);
        return { ...state, [action.laneId]: updatedLane };
    case EDIT_LANE:
      const lane = { ...state[action.laneId], editing: true };
      return { ...state, [action.laneId]: lane };
    default:
      return state;
  }
}
