
// Import Actions
import { CREATE_LANE, CREATE_LANES, UPDATE_LANE, DELETE_LANE, EDIT_LANE, MOVE_BETWEEN_LANES_WITH_NOTES } from './LaneActions';
import { CREATE_NOTE, DELETE_NOTE, MOVE_WITHIN_LANE } from '../Note/NoteActions.js';

import omit from 'lodash/omit';

function moveNotes(array, sourceNoteId, targetNoteId) {
  const sourceIndex = array.indexOf(sourceNoteId);
  const targetIndex = array.indexOf(targetNoteId);
  const arrayCopy = [...array];

  arrayCopy.splice(targetIndex, 0, arrayCopy.splice(sourceIndex, 1)[0]);
  return arrayCopy;
}

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
        //console.log(newLane.notes);
        return { ...state, [action.laneId]: newLane };
    case DELETE_NOTE:
        const updatedLane = { ...state[action.laneId] };
        updatedLane.notes = updatedLane.notes.filter(noteId => noteId !== action.noteId);
        return { ...state, [action.laneId]: updatedLane };
    case EDIT_LANE:
      const lane = { ...state[action.laneId], editing: true };
      return { ...state, [action.laneId]: lane };
    case MOVE_WITHIN_LANE:
      const newLaneMovedNote = { ...state[action.laneId] };
      newLaneMovedNote.notes = moveNotes(newLaneMovedNote.notes, action.sourceId, action.targetId);
      return { ...state, [action.laneId]: newLaneMovedNote };
    case MOVE_BETWEEN_LANES_WITH_NOTES: {
      const targetLane = { ...state[action.targetLaneId] };
      const sourceLane = { ...state[action.sourceLaneId] };
      const noteExistInLane = targetLane.notes.find(noteId => noteId === action.noteId);
      if (!noteExistInLane) {
        targetLane.notes = [...targetLane.notes, action.noteId];
        console.log(targetLane.notes);
        sourceLane.notes = sourceLane.notes.filter(noteId => noteId !== action.noteId);
        return { ...state, [action.targetLaneId]: targetLane, [action.sourceLaneId]: sourceLane };
      }
    }
    default:
      return state;
  }
}
