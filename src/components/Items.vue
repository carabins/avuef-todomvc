<template>
  <section class="main" :v-show="showList" >
    <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone" @change="$a.items.selectAll(allDone)">
    <label for="toggle-all" style="cursor: pointer">Mark all as complete</label>
    <ul class="todo-list">
      <Item v-for="todo in todos" :xid="todo.id" :todo="todo"  />
    </ul>
    <!--<pre > {{Object.keys(todos).map(k=>todos[k])}} </pre>-->
  </section>
</template>

<script>
import Item from './Item'

export default {
  data: () => ({
    newName: '',
    todos: [],
    showList: false,
  }),
  components: { Item },
  mapFlow: {
    // todos: 'items.list',
    allDone: 'items.allDone',
  },
  onFlow: {
    'items.list': function (v) {
      // console.log(v === this.todos)
      this.todos = v
    },
  },
  computated: {
    showList() {
      return Object.keys(this.todos).length
    },
  },
}
</script>
