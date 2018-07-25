import callApi from '../../util/apiCaller';
//import { lanes } from '../../util/schema';
//import { normalize } from 'normalizr';

// Export Constants
export const CREATE_NOTE = 'CREATE_NOTE';
export const CREATE_NOTES = 'CREATE_NOTES';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';

// Export Actions
export function createNote(note, laneId) {
  return {
    type: CREATE_NOTE,
    laneId,
    note: {
      laneId: laneId,
      ...note,
    },
  };
}

export function createNotes(notesData) {
  return {
    type: CREATE_NOTES,
    notes: notesData,
  }
}
export function createNoteRequest(note, laneId) {
  return (dispatch) => {
    return callApi('notes', 'post', {note, laneId }.then(noteResp => {
      dispatch(createNote(noteResp, laneId));
    }))
  }
}
export function updateNote(note) {
  return {
    type: UPDATE_NOTE,
    note,
  };
}

export function deleteNote(noteId, laneId) {
  return {
    type: DELETE_NOTE,
    noteId,
    laneId,
  };
}

export function editNote(noteId, laneId) {
  return {
    type: EDIT_NOTE,
    noteId,
    laneId,
  };
}
