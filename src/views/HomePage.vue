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
    <confirm-modal :message="confirmMsg" @cancel="confirmCancel" @confirm="confirm"/>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import NoteItem from '../components/NoteItem.vue';
import CustomeBtn from '../components/UI/CustomeBtn.vue';
import CustomeInput from '../components/UI/CustomeInput.vue';
import ConfirmModal from '../components/ConfirmModal.vue';

import { getNotesList, deleteNote } from '../api';

export default {
  name: 'HomePage',
  components: {
    NoteItem,
    CustomeBtn,
    CustomeInput,
    ConfirmModal,
  },
  data() {
    return {
      noteList: [],
      filter: '',
      confirmMsg: '',
      promiseResConfData: null,
    };
  },
  watch: {
    $route() {
      this.noteList = getNotesList();
    },
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
      this.$router.push('/change/new');
    },
    select(id) {
      this.$router.push(`/change/${id}`);
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
