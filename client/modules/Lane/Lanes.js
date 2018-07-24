import React, { PropTypes } from 'react';
import Lane from './LaneContainer.js';

const Lanes = ({ lanes }) => {
  return (
      <div className="lanes">{lanes.map(lane =>
        <Lane className="lane" key={lane.id} lane={lane} />
      )}</div>
  );
};

Lane propTypes = {
  lanes: PropTypes.array,
};

export default Lanes;
