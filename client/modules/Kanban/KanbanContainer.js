import { connect } from 'react-redux';
import Kanban from './Kanban';
import { createNote } from '../Note/NoteActions';
import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { compose } from 'redux';

const mapStateToProps = (state, ownProps) => ({
    boardLanes: ownProps.board.lanes.map(laneId => state.lanes[laneId]),
});
const mapDispatchToProps = {
  addNote: createNote,
  createLane: createLaneRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
