<template>
  <modal-dialog :isOpen="message !== ''">
    <template v-slot:content>
      <div class="flex">
        <p>{{ message }}</p>
        <div class="btns">
          <custome-btn @click="$emit('confirm')">
            confirm
          </custome-btn>
          <custome-btn class="cancel" @click="$emit('cancel')">
            cancel
          </custome-btn>
        </div>
      </div>
    </template>
  </modal-dialog>
</template>

<script>
import ModalDialog from './ModalDialog.vue';
import CustomeBtn from './UI/CustomeBtn.vue';

export default {
  components: { ModalDialog, CustomeBtn },
  name: 'confirm-modal',
  props: {
    message: {
      type: String,
    },
  },
  emits: {
    confirm: null,
    cancel: null,
  },
};
</script>

<style lang="scss" scoped>
  .flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .btns {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
  .cancel:hover {
    background-color: lighten($color: red, $amount: 25%);
  }
</style>
