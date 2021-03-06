/* eslint-disable no-param-reassign */
import {N} from 'avuef'

export const filterTags = {
  all: 'All',
  active: 'Active',
  complete: 'Completed'
}
export default {
  // Flow Nodes constructor
  nodes: {
    // Flows with 'stored' and 'observ' will be wrapped in the Vue.observable and saved to LocalStorage
    list: N.stored.observ.value([]),
    // Call action on every data change
    filter: N.bind('changeFilter').value(filterTags.all),
    // Get data from 'list' and compute in "calcStats" action
    stats: N.in('calcStats list'),
    editItem: N // Empty node flow
  },
  // Module actions
  actions: {
    calcStats(list) {
      const totalItems = list.length
      const count = list.filter(item => item.completed).length
      return {
        remain: totalItems - count,
        allDone: count === totalItems
      }
    },
    changeFilter(tag) {
      switch (tag) {
        case filterTags.active:
          this.$f.items.list.effect(list => list.filter(item => !item.completed))
          break
        case filterTags.complete:
          this.$f.items.list.effect(list => list.filter(item => item.completed))
          break
        default:
          this.$f.items.list.clearEffect()
      }
    },
    add(title) {
      title = title.trim()
      if (title.length === 0) return
      this.$f.items.list.push({title, completed: false})
    },
    selectAll(v) {
      this.$f.items.list.each(item =>
        item.completed = v
      )
    },
    removeCompleted() {
      this.$f.items.list.mutate(list =>
        list.filter(item => !item.completed)
      )
    }
  }
}
