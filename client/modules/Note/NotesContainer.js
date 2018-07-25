import { connect } from 'react-redux';
import Notes from './Notes';
import { updateNote, editNote, deleteNote, deleteNoteRequest } from '../Note/NoteActions';

const mapDispatchToProps = {
  updateNote,
  editNote,
  deleteNote: deleteNoteRequest,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);
