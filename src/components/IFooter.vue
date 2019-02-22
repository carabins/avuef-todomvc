<template>
  <footer class="footer">
    <span class="todo-count"><strong>{{count}}</strong> item left</span>
    <ul class="filters" >
      <li>
        <a v-for="f in filterTags"
            :class="{selected:f===filter}"
            @click="$f.items.filter(f)"
            style="cursor: pointer">
          {{f}}
        </a>
      </li>
    </ul>
    <button class="clear-completed" @click="$a.items.removeCompleted()">Clear completed</button>
  </footer>
</template>

<script>
import { filterTags } from '../store/items'

export default {
  data: () => ({ filterTags }),
  mapFlow: {
    count: 'items.count',
    filter: 'items.filter',
  },
}
</script>
