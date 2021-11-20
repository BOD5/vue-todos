<template>
  <div>
    <modal-dialog :isOpen="true">
        <template v-slot:content>
          <change-note :note='note' @cancel="cancel" @save="saveNote"/>
        </template>
    </modal-dialog>
    <confirm-modal :message="confirmMsg" @cancel="confirmCancel" @confirm="confirm"/>
  </div>
</template>

<script>
import { setNewNote, getNoteById } from '../api';
import ChangeNote from '../components/ChangeNote.vue';
import ConfirmModal from '../components/ConfirmModal.vue';
import ModalDialog from '../components/ModalDialog.vue';

export default {
  components: { ModalDialog, ChangeNote, ConfirmModal },
  name: 'change-page',
  data: () => ({
    promiseResConfData: null,
    confirmMsg: '',
  }),

  computed: {
    note() {
      if (this.$route.params) {
        const id = parseInt(this.$route.params.id, 10);
        if (id) return getNoteById(id);
      }
      return null;
    },
  },
  methods: {
    saveNote(note) {
      setNewNote(note);
      this.$router.replace('/');
    },
    cancel() {
      this.confirmMsg = 'Are you sure you want to undo your changes?';
      this.createPromise().then((result) => {
        if (result === true) {
          this.$router.replace('/');
        }
        this.confirmMsg = '';
        this.promiseResConfData = null;
      });
    },
    confirm() {
      this.promiseResConfData.resolve(true);
    },
    confirmCancel() {
      this.promiseResConfData.resolve(false);
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
  },
};
</script>

<style>

</style>
