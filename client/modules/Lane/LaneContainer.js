import { connect } from 'react-redux';
import Lane from './Lane';
import { deleteLane, updateLane, editLane } from './LaneActions';
import { createNote } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => {
  return {
    laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
  };
};

const mapDispatchToProps =  {
  editLane,
  deleteLane,
  updateLane,
  addNote: createNoteRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);
