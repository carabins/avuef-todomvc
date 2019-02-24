import { F } from 'avuef'

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
  // Module actions
  actions: {
    mix(all, filter) {
      let count = 0
      const a = []
      const ids = Object.keys(all)
      ids.map((k) => {
        const item = all[k]
        if (item.completed) count++
        switch (filter) {
          case filterTags.all: a.push(item)
            break
          case filterTags.active: if (!item.completed) a.push(item)
            break
          case filterTags.complete: if (item.completed) a.push(item)
            break
        }
      })
      const totalItems = ids.length
      this.$f.items.count(totalItems - count)
      // All side effects are logged in the console by default.
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
