import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import { createNote } from '../Note/NoteActions';
import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';
//import { DragDropContext } from 'react-dnd';
//import HTML5Backend from 'react-dnd-html5-backend';
//import { compose } from 'redux';

// Import Style
import styles from './Kanban.css';

class Kanban extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    const {
      board,
      boardLanes,
      createLane,
    } = this.props;

    const boardId = board.id;
    return (
      <div className={styles.kanban}>
          <button
          className={styles.AddLane}
          onClick={() => createLane({
          name: 'New lane',
         })}
          >Add Lane</button>
        <h2>{board.name}</h2>
        <Lanes
          lanes={boardLanes}
          boardId={boardId}
        />
      </div>
    );
  }
}

Kanban.need = [() => { return fetchLanes(); }];

Kanban.propTypes = {
    boardLanes: PropTypes.array,
    board: PropTypes.object,
    createLane: PropTypes.func,
};
export default Kanban;
/* compose (
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(Kanban); */
