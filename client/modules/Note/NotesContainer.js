import { connect } from 'react-redux';
import Notes from './Notes';
import { updateNote, editNote, deleteNote, deleteNoteRequest, updateNoteRequest } from '../Note/NoteActions';

const mapDispatchToProps = {
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  editNote,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);
