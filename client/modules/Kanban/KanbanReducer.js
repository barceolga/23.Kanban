import { MOVE_LANE } from './KanbanActions';
import { CREATE_LANE, DELETE_LANE, MOVE_BETWEEN_LANES } from '../Lane/LaneActions';
import uuid from 'uuid';

function moveLanes(array, sourceLaneId, targetLaneId) {
  const sourceIndex = array.indexOf(sourceLaneId);
  const targetIndex = array.indexOf(targetLaneId);
  const arrayCopy = [...array];

  arrayCopy.splice(targetIndex, 0, arrayCopy.splice(sourceIndex, 1)[0]);
  return arrayCopy;
}

const initialState = {};
console.log(initialState);

export default function kanban(state = initialState, action){
  kanban.id = uuid();
  const kanbanId = kanban.id;
  console.log(kanbanId);
  switch(action.type) {
    case CREATE_LANE:
        const newKanban = { ...state[action.kanbanId] };
        console.log(action.kanbanId);
        newKanban.lanes = newKanban.lanes.concat(action.lane.id);
        //console.log(newLane.notes);
        return { ...state, [action.kanbanId]: newKaban};
    case DELETE_LANE:
        const updatedKanban = { ...state[action.kanbanId] };
        console.log(updatedKanban);
        updatedKanban.lanes = updatedKanban.lanes.filter(laneId => laneId !== action.laneId);
        return { ...state, [action.kanbanId]: updatedKanban };
    case MOVE_LANE:
        const reupdatedKanban = { ...state[action.kanbanId] };
        reupdatedKanban.lanes = moveLanes(reupdatedKanban.lanes, action.sourceId, action.targetId);
        console.log(reupdatedKanban);
        console.log(reupdatedKanban.lanes);
    return { ...state, [action.kanbanId]: reupdatedKanban };
  default:
    return state;
  }
}
