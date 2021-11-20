<template>
  <div class="note">
    <div class="header">
      <h3>
        {{ note.title }}
      </h3>
      <custome-btn @click.stop="$emit('delete', note.id)">
        Del
      </custome-btn>
    </div>
    <hr>
    <div class="todos" v-for="todo in todos" :key='todo.id'>
      <input type="checkbox" v-model="todo.completed" disabled>
      <p>{{ todo.text }}</p>
    </div>
  </div>
</template>

<script>
import CustomeBtn from './UI/CustomeBtn.vue';

export default {
  name: 'NoteItem',
  components: {
    CustomeBtn,
  },
  props: {
    note: {
      type: Object,
    },
  },
  emits: {
    delete: (id) => typeof id === 'number',
  },
  computed: {
    todos() {
      return this.note.todos.slice(0, 5);
    },
  },
};
</script>

<style lang="scss" scoped>
  .note {
    border: 1px solid gray;
    border-radius: 25px;
    background-color: transparent;
    transition: .3s;
    min-width: 100px;
    max-width: 700px;
    margin: 7px;
    padding: 7px;
    &:hover {
      background-color: darken($color: lightgray, $amount: 10%);
    }
    @media(max-width: 700px) {
    width: 100%;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 5px;
      h3 {
        margin: 0px;
        word-break: break-word;
      }
      button {
        &:hover {
          background-color: lighten($color: red, $amount: 25%);
        }
      }
    }
    .todos {
      width: 80%;
      display: flex;
      align-items: center;
      margin: 5px;
      p {
        margin: 0px 10px;
        word-break: break-word;
      }
    }
  }
</style>
