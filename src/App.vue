<template>
  <div class="main">
    <header>
      <custome-input :placeholder="'Find some one'" class="input" v-model="filter"/>
      <custome-btn @click="handlerCreate()">Create new</custome-btn>
    </header>
    <div class="notes-list" >
      <note-item
        v-for="note in filteredList"
        :key="note.id"
        @click="select(note.id)"
        :note="note"
        @delete="delNote"
      />
    </div>
    <modal-dialog :isOpen="openModal">
       <template v-slot:content>
         <change-note :noteId='selectedNote' @cancel="cancel" @save="saveNote"/>
       </template>
    </modal-dialog>
    <confirm-modal :message="confirmMsg" @cancel="confirmCancel" @confirm="confirm"/>
  </div>
</template>

<script>
import NoteItem from './components/NoteItem.vue';
import ModalDialog from './components/ModalDialog.vue';
import ChangeNote from './components/ChangeNote.vue';
import CustomeBtn from './components/UI/CustomeBtn.vue';
import CustomeInput from './components/UI/CustomeInput.vue';
import ConfirmModal from './components/ConfirmModal.vue';

import { getNotesList, setNewNote, deleteNote } from './api';

export default {
  name: 'App',
  components: {
    NoteItem,
    ModalDialog,
    ChangeNote,
    CustomeBtn,
    CustomeInput,
    ConfirmModal,
  },
  data() {
    return {
      noteList: [],
      filter: '',
      selectedNote: null,
      openModal: false,
      confirmMsg: '',
      promiseResConfData: null,
    };
  },
  beforeMount() {
    this.noteList = getNotesList();
  },
  computed: {
    filteredList() {
      if (this.filter === '') return this.noteList;
      return this.noteList.filter((note) => {
        const state = note.title.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
        return state;
      });
    },
  },
  methods: {
    handlerCreate() {
      this.selectedNote = null;
      this.openModal = true;
    },
    saveNote(note) {
      const index = this.noteList.findIndex((n) => n.id === note.id);
      if (index !== -1) {
        this.noteList[index] = setNewNote(note);
        this.openModal = false;
        return;
      }
      this.noteList.push(setNewNote(note));
      this.openModal = false;
    },
    cancel() {
      this.confirmMsg = 'Are you sure you want to undo your changes?';
      this.createPromise().then((result) => {
        if (result === true) {
          this.openModal = false;
        }
        this.confirmMsg = '';
        this.promiseResConfData = null;
      });
    },
    select(id) {
      this.selectedNote = id;
      this.openModal = true;
    },
    delNote(id) {
      this.confirmMsg = 'Are you sure to delete this note?';
      this.createPromise().then((result) => {
        if (result === true) {
          this.noteList = this.noteList.filter((note) => note.id !== id);
          deleteNote(id);
        }
        this.confirmMsg = '';
        this.promiseResConfData = null;
      });
    },
    createPromise() {
      let resolve;
      let reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      this.promiseResConfData = { resolve, reject };
      return promise;
    },
    confirm() {
      this.promiseResConfData.resolve(true);
    },
    confirmCancel() {
      this.promiseResConfData.resolve(false);
    },
  },
};
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    background-color: lightgray;
    height: 100vh;
    overflow: auto;

    header {
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      .input {
        width: 50%;
      }
      button {
        margin-left: 20px;
        &:hover {
          background-color: lightgreen;
        }
      }
    }
    .notes-list {
      width: 80%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
</style>
