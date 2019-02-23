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
    add(title) {
      title = title.trim()
      if (title.length === 0) return
      const id = Math.floor(Math.random() * 100)
      this.$f.items.all.set(id, { id, title, completed: false })
    },
    selectAll(v) {
      this.$f.items.all.each((item) => {
        item.completed = v
      })
    },
    removeCompleted() {
      this.$f.items.all.each((item, key, all) => {
        if (item.completed) delete all[key]
      })
    },
  },
}
