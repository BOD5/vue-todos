<template>
  <button>
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'custome-btn',
};
</script>

<style lang="scss" scoped>
button {
  padding: 5px 15px;
  border-radius: 50px;
  transition: .5s;
  background-color: transparent;
  border: 1px solid #f2f7f6;
  &:hover {
    background-color: lightgreen;
  }
}
</style>