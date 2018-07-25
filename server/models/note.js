import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  task: { type: 'String', required: true },
  id: { type: 'String', required: true, unique: true },
  laneId : { type: 'String', required: true, unique: false},

});

export default mongoose.model('Note', noteSchema);
