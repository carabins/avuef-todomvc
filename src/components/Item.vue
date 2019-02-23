<template>
  <li
    class="todo"
    :class="{ completed: todo.completed, editing: isEdit }"
  >
    <div class="view" v-if="!isEdit">
      <input
        class="toggle"
        type="checkbox"
        v-model="todo.completed"
        @change="$f.items.all.emit();"
      />
      <label @dblclick="$f.items.editID(todo.id)">{{ todo.title }}</label>
      <button class="destroy" @click="$f.items.all.remove(todo.id);"></button>
    </div>
    <input v-else
        class="edit" type="text" v-model="newName"
        @blur="doneEdit()"
        @keyup.enter="doneEdit()"
        @keyup.esc="$f.items.editID(null)">

  </li>
</template>

<script>
export default {
  props: ['xid', 'todo'],
  data: () => ({
    newName: '',
  }),
  mapFlow: {
    todos: 'items.all',
    editID: 'items.editID',
  },
  methods: {
    doneEdit() {
      this.todo.title = this.newName.trim()
      this.$f.items.editID(null)
      // TODO remove comment for save to LocalStore
      // just notify all listeners
      // this.$f.items.all.emit()
    },
  },
  computed: {
    isEdit() {
      return this.todo.id === this.editID
    },
  },
}
</script>
