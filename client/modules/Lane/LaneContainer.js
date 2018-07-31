import { connect } from 'react-redux';
import Lane from './Lane';
import { deleteLane, updateLane, editLane, deleteLaneRequest, updateLaneRequest, moveBetweenLanesWithNotes } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';

const mapStateToProps = (state, ownProps) => ({
    laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});

const mapDispatchToProps = {
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  addNote: createNoteRequest,
  editLane,
  moveBetweenLanesWithNotes,
};

const noteTarget = {
 hover(targetProps, monitor) {
   const sourceProps = monitor.getItem();
   const { id: noteId, laneId: sourceLaneId } = sourceProps;
     targetProps.moveBetweenLanesWithNotes(
       targetProps.lane.id,
       noteId,
       sourceLaneId,
     );
    },
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);
