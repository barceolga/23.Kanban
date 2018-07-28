
export const MOVE_LANE = 'MOVE_LANE';

export function moveLane(targetId, sourceId) {
  return  {
    type: MOVE_LANE,
    sourceId,
    targetId,
  };
}
