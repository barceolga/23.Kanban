import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid';

export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
    laneId: laneId,
    id: uuid(),
  });

  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
  }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        console.log(saved);
        return lane.save();
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

export function deleteNote(req, res) {
  const noteId = req.params.noteId;
  Note.findOne({ id: noteId }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }

      Lane.findOne({ id: note.laneId }).exec((err, lane) => {
        const updatedNotes = lane.notes.filter(note => note.id !== noteId);
        lane.notes = updatedNotes;
        lane.save(() => {
            note.remove(() => {
              res.status(200).end();
            });
        });
      });
    });
}

export function editNote(req, res) {
  const noteId = req.params.noteId;
  const newTask = req.body.task;
  Note.findOne({ id: noteId }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }

    note.task = newTask;
    note.save((err, noteSaved) => {
      if (err) {
        res.status(500).end();
      }
      res.json(noteSaved);
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
    });
  });
}
