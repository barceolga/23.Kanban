import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotesContainer from '../Note/NotesContainer';
import Edit from '../../components/Edit.js';
import ItemTypes from '../Kanban/itemTypes';
import {DragSource, DropTarget } from 'react-dnd';
import {compose} from 'redux';

// Import Style
import styles from './Lane.css';

class Lane extends React.Component {
  constructor(props) {
    super(props);
      this.props = props;
  }
render() {

  const {
    connectDragSource,
    connectDropTarget,
    isDragging,
    lane,
    laneNotes,
    updateLane,
    addNote,
    editLane,
    deleteLane,
    editing,
  } = this.props;

  const laneId = lane.id;

  const dragSource = editing ? a => a : connectDragSource;

  return dragSource(connectDropTarget(

      <div className={styles.Lane}
      style={{
        opacity: isDragging ? 0 : 1,
      }}>
      <div className={styles.LaneHeader}>
          <div className={styles.LaneAddNote}>
              <button onClick={() => addNote({ task: 'New Note' }, laneId)}>Add Note</button>
          </div>
          <Edit
                className={styles.LaneName}
                editing={lane.editing}
                value={lane.name}
                onValueClick={() => editLane(lane.id)}

                onUpdate={name => updateLane({ ...lane, name, editing: false })}
          />
          <div className={styles.LaneDelete}>
              <button onClick={() => deleteLane(laneId)}>Remove Lane</button>
          </div>
      </div>
      <NotesContainer
        notes={laneNotes}
        laneId={laneId}
      />
      </div>
    ));
  }
}

const laneSource = {
  beginDrag(props) {
    return {
      id: props.id,
    };
},
isDragging(props, monitor) {
  return props.id === monitor.getItem().id;
}
}

const laneTarget = {
hover(targetProps, monitor) {
  const sourceProps = monitor.getItem();
    if (targetProps.id !== sourceProps.id) {
      targetProps.moveLane(targetProps.id, sourceProps.id);
    }
  }
}

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  addNote: PropTypes.func,
  updateLane: PropTypes.func,
  deleteLane: PropTypes.func,
  editLane: PropTypes.func,
  moveLane:PropTypes.func,
};

export default compose(
  DragSource(ItemTypes.LANE, laneSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.LANE, laneTarget, (connect) => ({
    connectDropTarget: connect.dropTarget(),
  }))
)(Lane);
