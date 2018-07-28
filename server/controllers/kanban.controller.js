import Kanban from '../models/kanban';
import Lane from '../models/lane';
import uuid from 'uuid';


export function setKanban(req, res) {

  const newKanban = new Kanban;

  newKanban.lanes = [];
  newKanban.id = uuid();
  newKanban.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}
