import { connect } from 'react-redux';
import Lane from './Lane';
import { deleteLane, updateLane, editLane, deleteLaneRequest, updateLaneRequest } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => ({
    laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId]),
});
const mapDispatchToProps =  {
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  addNote: createNoteRequest,
  editLane,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);
