import { storageService } from '../../../services/async-storage-service.js';
export const notesService = { getNotes, addNote, removeNote, updateNote, getEmptyNote };

const NOTES_KEY = 'notes';
const gList = [
  { id: 'n101', type: 'note-txt', isPinned: true, color: 'color5', info: { txt: 'osher cappelli' } },
  {
    type: 'note-video',
    isPinned: false,
    color: 'color1',
    info: { txt: 'https://www.youtube.com/watch?v=kk0WRHV_vt8', videoId: 'kk0WRHV_vt8' },
    id: 'Yok4i',
  },
  {
    id: 'n104',
    type: 'note-txt',
    isPinned: false,
    color: 'color4',
    info: {
      txt: 'The Plage de Coco, or Coco Beach, is one of the less well-known and less frequented beaches in Nice. \nSo, if you are also looking for some relaxation during your stay, this is the place to be. \nUnlike the other beaches, Coco Beach is not just a pebble beach, but also a rocky beach. \nIt is quite unspoilt and at some points you can only get into the water via a ladder. \nThe way there is also a bit steeper, but the little effort definitely pays off in the end!',
    },
  },
  {
    id: 'n105',
    type: 'note-txt',
    isPinned: false,
    color: 'color5',
    info: { txt: 'object is a function that return data... right? 🤔 wait... ' },
  },
  {
    id: 'n106',
    type: 'note-txt',
    isPinned: false,
    color: 'color6',
    info: {
      txt: 'dad jokes:\n* "I\'m afraid for the calendar. Its days are numbered." \n*"My wife said I should do lunges to stay in shape. That would be a big step forward." \n*"Why do fathers take an extra pair of socks when they go golfing?" "In case they get a hole in one!" \n*"Singing in the shower is fun until you get soap in your mouth. Then it\'s a soap opera." \n\n',
    },
  },
  {
    type: 'note-txt',
    isPinned: true,
    color: 'color1',
    info: {
      txt: 'credit card: 4580 0107 7065 5244\ncar: *4344\nemail: jojoCorona@gmail.com Joco123\nleumi: Gmpj1hks money123456789\n',
    },
    id: 'HxGKk',
  },
  {
    type: 'note-img',
    isPinned: true,
    color: 'color3',
    info: {
      txt: 'https://64.media.tumblr.com/c03e4e16c71fd39dcfba44219b761b78/76a476a5d0a9ef4b-b5/s1280x1920/adf8d5651ee532ac3a422bf1b768a6f126d1fd40.png',
    },
    id: 'eHJ6c',
  },
  {
    type: 'note-video',
    isPinned: true,
    color: 'color2',
    info: { txt: 'https://www.youtube.com/watch?v=muLb4vA_QJk', videoId: 'muLb4vA_QJk' },
    id: 'gQG7U',
  },
  {
    type: 'note-img',
    isPinned: false,
    color: 'color1',
    info: { txt: 'https://www.ilovestyle.com/sites/default/files/sitefiles_2018-04/cat_vr.jpg' },
    id: 'RHduw',
  },
];

_init();
function _init() {
  let data = getNotes().then((notes) => {
    if (!notes.length) {
      data = gList;
      localStorage.setItem(NOTES_KEY, JSON.stringify(data));
    }
  });
}

function getNotes() {
  return storageService.query(NOTES_KEY);
}

function addNote(note) {
  return storageService.post(NOTES_KEY, note).then(() => getNotes());
}

function removeNote(noteId) {
  return storageService.remove(NOTES_KEY, noteId).then(() => getNotes());
}

function updateNote(note) {
  return storageService.put(NOTES_KEY, note).then(() => getNotes());
}

function getEmptyNote() {
  return {
    type: 'note-txt',
    isPinned: false,
    color: 'color1',
    info: {
      txt: '',
    },
  };
}
