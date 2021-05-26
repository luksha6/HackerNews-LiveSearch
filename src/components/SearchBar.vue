<template>
  <div class="container">
    <h4 class="title">Search Hacker News</h4>
    <div class="search-bar">
      <img class="search-icon" src="../assets/icons/search-icon.svg" />
      <input
        class="search-box"
        v-model="search"
        v-debounce:300ms="onSearchInputChange"
        type="text"
        placeholder="Type here to start searching"
      />
    </div>
    <p v-if="loading" class="loading-text">Loading...</p>
    <SearchResults :results="news" :search="search" v-else/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SearchResults from "./SearchResults";

export default {
  name: "SearchBar",
  components: {
    SearchResults,
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    ...mapActions({ searchNews: "searchNewsByQuery" }),
    onSearchInputChange() {
      this.searchNews(this.search);
    },
  },
  computed: {
    ...mapGetters({
      news: "getAllNews",
      loading: "isLoading",
    }),
  },
};
</script>