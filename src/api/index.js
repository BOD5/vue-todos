const getNotesList = () => {
  if (localStorage.getItem('notesList')) {
    return JSON.parse(localStorage.getItem('notesList'));
  }
  return [];
};

const getNoteById = (id) => {
  if (id === 'new') { return null; }
  const list = JSON.parse(localStorage.getItem('notesList'));
  const note = list.find((n) => n.id === id);
  return note;
};

const setNewNote = (note) => {
  const list = JSON.parse(localStorage.getItem('notesList')) || [];
  const index = list.findIndex((n) => n.id === note.id);
  if (index === -1) {
    list.push(note);
  } else {
    list[index] = note;
  }
  localStorage.setItem('notesList', JSON.stringify(list));
  return note;
};

const deleteNote = (id) => {
  const list = JSON.parse(localStorage.getItem('notesList'));
  const index = list.findIndex((n) => n.id === id);
  if (index > -1) {
    list.splice(index, 1);
  }
  localStorage.setItem('notesList', JSON.stringify(list));
  return id;
};

export {
  getNoteById,
  getNotesList,
  setNewNote,
  deleteNote,
};
