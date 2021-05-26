<template>
  <div class="search-results" v-if="results.length > 0">
    <div v-for="(result, index) in results" :key="index">
      <div class="search-result" v-if="result.title">
        <div class="first-row">
          <p>
            <span
              class="title"
              v-if="result.title"
              v-html="result._highlightResult.title.value"
            >
            </span>
            <span class="link" v-if="result.url"
              ><a :href="result.url" target="_blank"> ({{ result.url }}) </a>
            </span>
          </p>
        </div>
        <div class="second-row">
          <p>
            <span v-if="result.author"> Author: {{ result.author }} |</span
            ><span v-if="result.created_at">
              {{ daysBetween(result.created_at) }} ago
            </span>
            <span v-if="result.num_comments"
              >| {{ result.num_comments }} comments
            </span>
          </p>
        </div>
        <div class="third-row" v-if="result.story_text">
          <span
            class="content"
            v-if="result.story_text"
            v-html="result._highlightResult.story_text.value"
          >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    results: {
      type: Array,
    },
    search: {
      type: String,
    },
  },
  methods: {
    daysBetween(createdAt) {
      let date = new Date(createdAt);
      let seconds = Math.floor((new Date() - date) / 1000);

      let interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + " year/s";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " month/s";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " day/s";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hour/s";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minute/s";
      }
      return Math.floor(seconds) + " second/s";
    },
  },
};
</script>