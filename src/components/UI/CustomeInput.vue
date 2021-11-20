<template>
  <div class="input">
    <input type='text' :placeholder="placeholder" :value="modelValue" @input="updateInput"/>
  </div>
</template>

<script>
export default {
  name: 'custome-input',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
    },
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  border-radius: 25px;
  background-color: #f2f7f6;
  padding: 4px;
  width: 100%;
  input {
    width: 100%;
    background-color: transparent;
    outline: none;
    outline-style: none;
    border: none;
    padding: 4px;
    margin: 5px 10px;
    border-bottom: solid lightgray 2px;
    transition: .3s;
    &:focus {
      border-bottom: solid black 2px;
      outline: none;
    }
  }
}
</style>
