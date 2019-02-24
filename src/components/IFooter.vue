<template>
  <footer class="footer">
    <span class="todo-count"><strong>{{ count }}</strong> item left</span>
    <ul class="filters">
      <li>
        <a
          v-for="name in filterTags"
          :class="{ selected: name === filter }"
          @click="$f.items.filter(name)"
          style="cursor: pointer"
        >
          {{ name }}
        </a>
      </li>
    </ul>
    <button class="clear-completed" @click="$a.items.removeCompleted()">Clear completed</button>
  </footer>
</template>

<script>
import { filterTags } from "../store/items"

export default {
  data: () => ({ filterTags }),
  mapFlow: {
    count: "items.stats.remain",
    filter: "items.filter"
  }
}
</script>
