import mongoose from 'mongoose';
import Note from '../models/note';
const Schema = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });

const laneSchema = new Schema({
  name: { type: 'String', required: true },
  notes: [{ type: Schema.ObjectId, ref: 'Note', required: true }],
  id: { type: 'String', required: true, unique: true },

});
function populateNotes(next) {
  this.populate('notes');
  next();
}

function removeAlsoNotes(next ) {
  console.log(note);
  note.remove({ref: {$in: ['Note']}});
  next();
}
laneSchema.pre('find', populateNotes);
laneSchema.pre('findOne', populateNotes);
laneSchema.pre('remove', removeAlsoNotes);

export default mongoose.model('Lane', laneSchema);
