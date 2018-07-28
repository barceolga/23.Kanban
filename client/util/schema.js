import { schema } from 'normalizr';

const note = new schema.Entity('notes');
const lane = new schema.Entity('lanes', {
  notes: [note],
});
const kanban = new schema.Entity('kanban', {
  lanes: [lane],
})

export const lanes = [lane];
