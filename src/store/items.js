import { F } from 'avuef'
import Vue from 'vue'

export const filterTags = {
  all: 'All',
  active: 'Active',
  complete: 'Completed',
}
export default {
  flows: {
    all: F.stored.observ.v({}),
    filter: F.v(filterTags.all),
    list: F.from(['all', 'filter'], 'mix'),
    allDone: F.v(true),
    editID: F,
    count: F.v(0),
  },
  actions: {
    mix(all, filter) {
      let count = 0
      const a = []
      Object.keys(all).map((k) => {
        const v = all[k]
        if (v.completed) count++
        switch (this.$f.items.filter.v) {
          case filterTags.all: a.push(v)
            break
          case filterTags.active: if (!v.completed) a.push(v)
            break
          case filterTags.complete: if (v.completed) a.push(v)
            break
        }
      })
      this.$f.items.count(count)
      this.$f.items.allDone(count === Object.keys(all).length)
      return a
    },
    remove(id) {
      this.$f.items.all.mutate((o) => {
        delete o[id]
        return o
      })
    },
    add(title) {
      title = title.trim()
      if (title.length === 0) return
      const id = Math.floor(Math.random() * 100)
      this.$f.items.all.mutate(o => (
        o[id] = { id, title, completed: false },
        o))
    },
    selectAll(v) {
      this.$f.items.all.mutate(o => (
        Object.keys(o).forEach((k) => {
          o[k].completed = v
        }),
        o))
    },
    removeCompleted() {
      this.$f.items.all.mutate(o => (Object.keys(o).forEach((k) => {
        if (o[k].completed) delete o[k]
      }), o))
    },
  },
}
