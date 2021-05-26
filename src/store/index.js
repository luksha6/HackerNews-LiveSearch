import Vue from "vue";
import Vuex from "vuex";
import constants from "../client/environment";

Vue.use(Vuex);

const url = constants.BASE_URL;
const headers = { Accept: "application/json" };

export default new Vuex.Store({
    state: {
        news: [],
        loading: false
    },
    mutations: {
        setNews(state, payload) {
            state.news = payload;
        },
        setLoading(state, payload) {
            state.loading = payload;
        }
    },
    actions: {
        async searchNewsByQuery({ commit }, query) {
            commit("setLoading", true);
            let data = [];
            if (query) {
                const news = await fetch(url + "search?query=" + query, { headers });
                let fetchedData = await news.json();
                data = fetchedData && fetchedData.hits ? sortDataByRelevancyScore(fetchedData.hits).slice(0, constants.NUMBER_OF_ITEMS) : [];
          }
         commit("setLoading", false);
         commit("setNews", data);
    }
  },
  modules: {},
  getters: {
      getAllNews: state => state.news,
      isLoading: state => state.loading
  }
});

function sortDataByRelevancyScore(data) {
    return data.sort((a, b) => {
        if (!a.relevancy_score) {
            a.relevancy_score = 0;
        }
        
        if (!b.relevancy_score) {
            b.relevancy_score = 0;
        }
        return a.relevancy_score > b.relevancy_score ? -1 : 1;
    });
}