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
    <Xfooter></Xfooter>

  </section>
</template>

<script>
import "./assets/todo.css";
import Items from "./components/Items";
import Xfooter from "./components/XFooter";

export default {
  name: "App",
  data: () => ({
    newName: ""
  }),
  components: {
    Items,
    Xfooter
  }
};
</script>
