<template>
  <li class="todo" :class="{ completed: todo.completed, editing: isEdit }">
    <div class="view" v-if="!isEdit">
      <input class="toggle" type="checkbox" v-model="todo.completed" />
      <label @dblclick="$f.items.editItem(todo)">{{ todo.title }}</label>
      <button class="destroy" @click="$f.items.list.remove(todo)"></button>
    </div>
    <input
      v-else
      class="edit"
      type="text"
      v-model="newName"
      @blur="doneEdit()"
      @keyup.enter="doneEdit()"
      @keyup.esc="$f.items.editItem(null)"
      v-focus
    />
  </li>
</template>

<script>
export default {
  props: ["todo"],
  data: () => ({
    newName: ""
  }),
  mapFlow: {
    editItem: "items.editItem"
  },
  methods: {
    doneEdit() {
      this.$f.items.editItem(null)
      const newTitle = this.newName.trim()
      if (!newTitle.length) return
      this.todo.title = newTitle
      // TODO remove comment for save to LocalStore
      // just notify all listeners
      // this.$f.items.all.emit()
    }
  },
  computed: {
    isEdit() {
      return this.todo === this.editItem
    }
  },
  directives: {
    focus(el) {
      setTimeout(() => el.focus(), 100)
    }
  }
}
</script>
