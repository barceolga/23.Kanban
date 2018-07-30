import { schema } from 'normalizr';

const note = new schema.Entity('notes');
const lane = new schema.Entity('lanes', {
  notes: [note],
});
const board = new schema.Entity('board', {
  lanes: [lane],
})

export const lanes = [lane];
export const boards = [board];
