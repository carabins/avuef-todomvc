<template>
  <section class="main" :v-show="showList" >
    <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone" @change="$a.items.selectAll(allDone)">
    <label for="toggle-all" style="cursor: pointer">Mark all as complete</label>
    <ul class="todo-list">
      <Item v-for="todo in todos" :key="todo.id" :todo="todo"/>
    </ul>
  </section>
</template>

<script>
import Item from './Item'

export default {
  data: () => ({
    newName: '',
    showList: false,
  }),
  components: { Item },
  mapFlow: {
    todos: 'items.list',
    allDone: 'items.stats.allDone',
  },
  computated: {
    showList() {
      return Object.keys(this.todos).length
    },
  },
}
</script>
