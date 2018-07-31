import Lane from '../models/lane';
import Note from '../models/note';
import Board from '../models/board';
import uuid from 'uuid';

export function addLane(req, res) {
  const { lane, boardId} = req.body
  if (!lane || !lane.name || !boardId) {
    res.status(403).end();
  }

  const newLane = new Lane({
    name: lane.name,
    boardId: boardId,
    id: uuid(),
  });

  newLane.notes = [];
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Board.findOne({ id: boardId })
      .then(board => {
        board.lanes.push(saved);
        return board.save();
      })
      .then(() => {
        res.json(saved);
      })
      .catch((err) => {
        console.log('err');
        console.log(err);
      });
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
      res.json({ lanes });
  });
}

export function deleteLane(req, res) {
  const laneId = req.params.laneId;
  Lane.findOne({ id: laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
      Board.findOne({ id: lane.boardId }).exec((err, board) => {
        const updatedLanes = board.lanes.filter(lane => lane.id !== laneId);
        board.lanes = updatedLanes;
        board.save(() => {
          lane.remove(() => {
          res.status(200).end();
        });
      });
    });
  });
}

export function editLaneName(req, res) {
  if (!req.body.name) {
    res.status(400).end();
  }

  Lane.findOneAndUpdate({ id: req.params.laneId }, { name: req.body.name }).exec(err => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).end();
  });
}

export function moveWithinLane(res, req) {
  const laneId = req.params.laneId;
  const sourceNoteId = req.params.noteId;
  const targetNoteId = req.params.noteId;
}
