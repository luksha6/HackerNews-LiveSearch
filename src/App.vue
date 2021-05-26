<template>
  <div id="app">
    <SearchBar />
  </div>
</template>

<script>
import "./assets/style/main.scss"
import SearchBar from "./components/SearchBar.vue";

export default {
  name: "App",
  components: {
    SearchBar,
  },
};
</script>
