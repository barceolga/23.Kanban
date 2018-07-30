import mongoose from 'mongoose';
import Lane from '../models/lane';
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: { type: 'String', required: true },
  lanes: [{ type: Schema.ObjectId, ref: 'Lane', required: true }],
  id: { type: 'String', required: true, unique: true },
});

mongoose.plugin(schema => { schema.options.usePushEach = true; });

function populateLanes(next) {
  this.populate('lanes');
  next();
}

boardSchema.pre('find', populateLanes);
boardSchema.pre('findOne', populateLanes);
boardSchema.pre('remove', function (next) {
  const lanesId = this.lanes.map(lane => lane.id);

  Lane.remove({ id: { $in: [lanesId] } }).exec();
  next();
});


export default mongoose.model('Board', boardSchema);
