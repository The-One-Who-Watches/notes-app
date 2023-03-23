const { default: chalk } = require("chalk");
const fs = require("fs");

const addNote = (title, body) => {
  const notes = loadNotes();
  //   const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);

  debugger;

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.bgGreen("New Note added!"));
  } else {
    console.log(chalk.bgRed("duplicate note title, note rejected"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => {
    return note.title !== title;
  });

  if (notes.length > filteredNotes.length) {
    console.log(chalk.bgGreen("note removed"));
    saveNotes(filteredNotes);
  } else {
    console.log(chalk.bgRed("no note removed"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length > 0) {
    console.log(chalk.bgGreen("Notes found"));
    notes.forEach((note) => {
      console.log(note.title);
    });
  } else {
    console.log(chalk.bgRed("Notes not found"));
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  duplicateNote = notes.find((note) => note.title === title);
  if (duplicateNote) {
    console.log(chalk.inverse(duplicateNote.title));
    console.log(duplicateNote.body);
  } else {
    console.log(chalk.red("Note not found"));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
