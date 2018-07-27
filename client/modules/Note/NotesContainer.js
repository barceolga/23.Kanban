import { connect } from 'react-redux';
import Notes from './Notes';
import { updateNote, editNote, deleteNote, deleteNoteRequest, updateNoteRequest, moveWithinLane } from '../Note/NoteActions';

const mapDispatchToProps = {
  editNote,
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  moveWithinLane,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);
