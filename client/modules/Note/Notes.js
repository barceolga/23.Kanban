import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import Edit from '../../components/Edit.js';
import { editNote, updateNote, deleteNote } from './NoteActions.js';
import styles from './Notes.css';

const Notes = ({ notes, laneId, editNote, updateNote, deleteNote, moveWithinLane }) => {
  return (<ul className={styles.notes}>{notes.map((note) =>
    <Note
      id={note.id}
      key={note.id}
      editing={note.editing}
      moveWithinLane={moveWithinLane}
      laneId={laneId}
    >
        <Edit
          editing={note.editing}
          value={note.task}
          onValueClick={() => editNote(note.id)}
          onUpdate={(task) => updateNote({
            ...note,
            task,
            editing: false,
          }
        )}
        onDelete={() => deleteNote(note.id, laneId)}
        />
      </Note>
  )}</ul>);
};

Notes.propTypes = {
  deleteNoteRequest: PropTypes.func,
  updateNote: PropTypes.func,
  deleteNote: PropTypes.func,
  editNote: PropTypes.func,
  moveWithinLane: PropTypes.func,
  laneId: PropTypes.string,
  notes: PropTypes.array,
};

export default Notes;
