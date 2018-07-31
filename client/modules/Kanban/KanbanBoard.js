import React from 'react';
import Kanban from './KanbanContainer';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const KanbanBoard = ({ boards = [] }) => {
  return (
      <div >{boards.map(board =>
        <Kanban key={board.id} board={board} />
      )}</div>
  );
};

KanbanBoard.propTypes = {
  board: PropTypes.object,
  boards: PropTypes.array,
};

export default compose(DragDropContext(HTML5Backend))(KanbanBoard);
