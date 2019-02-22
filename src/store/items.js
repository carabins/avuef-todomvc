import { F } from 'avuef'
import Vue from 'vue'

export const filterTags = {
  all: 'All',
  active: 'Active',
  complete: 'Completed',
}
export default {
  // Flow constructor
  flows: {
    // All data putted in the flow will be wrapped in the Vue.observable and save to LocalStorage
    all: F.stored.observ.value({}),
    filter: F.value(filterTags.all),
    // Get data from 'mix' action on every change 'all' and 'filter' flows
    list: F.from(['all', 'filter'], 'mix'),
    // Flows with values
    allDone: F.value(true),
    count: F.value(0),
    editID: F, // Empty flow
  },
  actions: {
    mix(all, filter) {
      let count = 0
      const a = []
      Object.keys(all).map((k) => {
        const v = all[k]
        if (v.completed) count++
        switch (filter) {
          case filterTags.all: a.push(v)
            break
          case filterTags.active: if (!v.completed) a.push(v)
            break
          case filterTags.complete: if (v.completed) a.push(v)
            break
        }
      })
      const totalItems = Object.keys(all).length
      this.$f.items.count(totalItems - count)
      this.$f.items.allDone(count === totalItems)
      return a
    },
    remove(id) {
      const all = this.$f.items.all()
      delete all[id]
      this.$f.items.all(all)
    },
    add(title) {
      title = title.trim()
      if (title.length === 0) return
      const id = Math.floor(Math.random() * 100)
      const all = this.$f.items.all()
      all[id] = { id, title, completed: false }
      this.$f.items.all(all)
    },
    selectAll(v) {
      const all = this.$f.items.all()
      Object.keys(all).forEach((k) => {
        all[k].completed = v
      })
      this.$f.items.all(all)
    },
    removeCompleted() {
      const all = this.$f.items.all()
      Object.keys(all).forEach((k) => {
        if (all[k].completed) delete all[k]
      })
      this.$f.items.all(all)
    },
  },
}
