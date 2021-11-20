<template>
  <div class="form">
    <h3>{{ newNote.title || 'create new note'}}</h3>
    <custome-input :placeholder="'note title'" v-model="newNote.title"/>
    <div class="todo-head">
      <p>todos</p>
      <custome-btn @click='addTodo()'>add</custome-btn>
    </div>
    <div class="todo-list">
      <div class="todo-item" v-for="todo in newNote.todos" :key='todo.id'>
        <input type="checkbox" v-model="todo.completed">
        <custome-input class="margin-y" :placeholder="'text'" v-model="todo.text" />
        <custome-btn @click='removeTodo(todo.id)' class="red-btn">remove</custome-btn>
      </div>
    </div>
    <div class="controls">
      <custome-btn @click="save()">save</custome-btn>
      <custome-btn @click="cancel()" class="red-btn">cancel</custome-btn>
    </div>
  </div>
</template>

<script>
import CustomeBtn from './UI/CustomeBtn.vue';
import CustomeInput from './UI/CustomeInput.vue';

export default {
  components: { CustomeInput, CustomeBtn },
  name: 'change-note',
  props: {
    note: {
      type: Object,
    },
  },
  emits: {
    save: (value) => value.id && value.title && value.todos,
    cancel: null,
  },
  created() {
    if (this.note !== null) {
      this.newNote = this.note;
    }
  },
  data() {
    return {
      newNote: {
        id: (new Date()).getTime(),
        title: '',
        todos: [],
        confirmMsg: '',
      },
    };
  },
  methods: {
    addTodo() {
      const todo = {
        id: (new Date()).getTime(),
        completed: false,
        text: '',
      };
      this.newNote.todos.push(todo);
    },
    removeTodo(id) {
      this.newNote.todos = this.newNote.todos.filter((t) => t.id !== id);
    },
    save() {
      this.$emit('save', this.newNote);
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
      word-break: break-word;
    }
    .todo-head, .controls{
      margin: 15px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        margin: 0px;
        word-break: break-word;
      }
    }
    .todo-list {
      width: 90%;
      max-height: 500px;
      overflow: hidden;
      overflow-y: auto;
      padding: 0px 15px;
      .todo-item  {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 5px;
        align-items: center;
      }
    }
  }

  .red-btn:hover{
    background-color: lighten($color: red, $amount: 25%);
  }

  .margin-y {
    margin: 0px 15px;
  }
</style>
