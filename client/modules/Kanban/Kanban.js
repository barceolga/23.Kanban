import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';

// Import Style
import styles from '../Lane/Lane.css';

const Kanban = (props) => (
  <div>
      <button className={styles.AddLane}
       onClick={() => props.createLane({
         name: 'New lane',
       })}
      >AddLane</button>
      <Lanes lanes={props.lanes} />
  </div>
);

Kanban.need = [() => { return fetchLanes(); }];

Kanban.propTypes = {
    lanes: PropTypes.array,
    createLane: PropTypes.func,
};

const mapStateToProps = state => ({
  lanes: Object.values(state.lanes)
});
const mapDispatchToProps = {
  ...laneActions,
  addNote: createNote,
  createLane: createLaneRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
