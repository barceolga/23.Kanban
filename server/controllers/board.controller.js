import Board from '../models/board';
import Lane from '../models/lane';
import uuid from 'uuid';


export function setBoard(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }
  const newBoard = new Board(req.body);

  newBoard.lanes = [];
  newBoard.id = uuid();
  newBoard.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getBoards(req, res) {
  Board.find().exec((err, boards) => {
    if (err) {
      res.status(500).send(err);
    }
      res.json({ boards });
  });
}
