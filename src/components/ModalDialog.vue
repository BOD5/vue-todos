<template>
  <div class="modal" v-if="isOpen" @click="closeModal">
    <div class="dialog" @click.stop>
        <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-dialog',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    closeModal() {
      this.$emit('update:isOpen', false);
    },
  },
};
</script>

<style scoped lang='scss'>

.modal {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  max-height: 100vh;
  .dialog {
    background-color: lightgray;
    align-self: flex-start;
    border-radius: 20px;
    padding: 25px;
    width: 450px;
    margin-top: 50px;
    overflow: auto;
    max-height: 80vh;
    @media(max-width: 700px) {
      width: 100%;
    }
  }
}
</style>
