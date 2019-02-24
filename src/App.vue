<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        v-model="newName"
        class="new-todo"
        placeholder="What needs to be done?"
        autofocus
        @keyup.enter="
          $a.items.add(newName);
          newName = '';
        "
      />
    </header>
    <Items></Items>
    <Ifooter></Ifooter>
    <About></About>
  </section>
</template>

<script>
import "./assets/todo.css"
import Items from "./components/Items"
import Ifooter from "./components/IFooter"
import About from './components/About'

export default {
  name: "App",
  data: () => ({
    newName: ""
  }),
  components: {
    About,
    Items,
    Ifooter
  }
}
</script>
