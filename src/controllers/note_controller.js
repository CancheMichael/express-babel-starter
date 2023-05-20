import Note from '../models/note';

export const getNotes = () => {
  return Note.find({}).then((notes) => {
    return notes.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});
  });
};

export const deleteNote = async (id) => {
  // to quote Prof. Cormen: left as an exercise to the reader
  // remember to return the mongoose function you use rather than just delete
  try {
    const confirmation = await Note.findByIdAndDelete(id);
    // return confirmation

    return confirmation;
  } catch (error) {
    throw new Error(`delete note error: ${error}`);
  }
};

export const createNote = async (fields) => {
  // you know the drill. create a new Note mongoose object
  // return .save()
  // await creating a post
  const note = new Note();
  note.title = fields.title;
  note.x = fields.x;
  note.y = fields.y;
  note.zIndex = fields.zIndex;
  note.text = fields.text;

  try {
    const savednote = await note.save();
    // return post

    return savednote;
  } catch (error) {
    throw new Error(`create note error: ${error}`);
  }
};

export const updateNote = (id, fields) => {
  return Note.findById(id)
    .then((note) => {
    // check out this classy way of updating only the fields necessary
      Object.keys(fields).forEach((k) => {
        note[k] = fields[k];
      });
      return note.save();
    });
};
