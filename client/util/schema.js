import { schema } from 'normalizr';

const note = new schema.Entity('notes');
const lane = new schema.Entity('lanes', {
  notes: [note],
});
const board = new schema.Entity('boards', {
  'lanes', {
    lanes: [lane], {
      notes: [note]
    }
  }
})

export const lanes = [lane];
export const boards = [board];
