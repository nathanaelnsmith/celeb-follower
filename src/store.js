import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { searchByTitle, searchByQuery, searchByID } from '@/lib/omdb'
import { debounce, unique } from '@/lib/utils'

const omdbByTitle = debounce((query, callback) => {
  callback(searchByQuery(query));
}, 1000);

export default new Vuex.Store({
  state: {
    query: null,
    results: [],
  },
  mutations: {
    searchQuery(state, query) {
      state.query = query;
    },
    storeResults(state, results) {
      state.results = [...state.results, ...results];
    },
    resetResults(state) {
      state.results = [];
    },
    updateResult(state, { details, id }) {
      const index = state.results.findIndex(r => r.imdbID === id);
      console.log('result index: ', index);
      details = { ...details.data, Actors: details.data.Actors.split(', ') };
      Vue.set(state.results, index, { ...state.results[index], ...details });
    },
  },
  actions: {
    search({ commit, dispatch }, query) {
      commit('searchQuery', query);
      dispatch('searchByTitle', query);
    },
    async searchByTitle({ commit, state }, query) {
      if (state.results.length) {
        commit('resetResults');
      }
      omdbByTitle(query, async movies => {
        const uniqueMovies = (await movies).data.Search;
        commit('storeResults', unique(uniqueMovies, (a,b) => a.imdbID == b.imdbID));
      });
    },
    async fetchDetails({ commit }, id) {
      const details = await searchByID(id);
      commit('updateResult', { details, id });
    },
  }
})
