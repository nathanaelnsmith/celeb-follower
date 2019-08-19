<template lang="html">
  <div class="results" v-if="query">
    <div class="result" :class="{ 'active': activeResult === result.imdbID }" v-for="result in results" @click="activeResult = result.imdbID">
      <div class="close" v-if="activeResult === result.imdbID" @click.stop="closeResult">
        x
      </div>
      <div class="info">
        <img :src="result.Poster" />
        <p>{{ result.Title }} ({{ result.Year }})</p>
        <p><a target="_blank" @click.stop="null" :href="`https://www.imdb.com/title/${result.imdbID}/`">IMDB</a></p>
      </div>
      <div class="actors" :class="{ 'active': activeResult === result.imdbID }">
        <div class="row" v-for="actor in result.Actors">
          <p>{{ actor }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      activeResult: null,
    };
  },
  computed: {
    ...mapState({
      query: s => s.query,
      results: s => s.results,
    }),
  },
  methods: {
    actorList(str) {
      if (!str) return;
      return str.split(', ');
    },
    closeResult() {
      console.log('close');
      this.activeResult = null;
    },
  },
  watch: {
    activeResult(id) {
      if (id === null) return;
      const activeMovie = this.results.find(r => r.imdbID === id);
      if(!activeMovie.Actors) {
        console.log('fetch movie details')
        this.$store.dispatch('fetchDetails', id);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/settings.scss';
.results {
  flex-grow: 1;
  align-items: stretch;
  text-align: left;
  border-top: 1px solid $border-color;
}
.result {
  display: flex;
  flex-direction: column;
  
  border-bottom: 1px solid $border-color;
  padding: 8px 16px;
  
  background-color: $row-background;
  
  &.active {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }
  img {
    height: 100px;
    margin-right: 8px;
  }
  .info {
    display: flex;
    align-items: center;
  }
  &.active .info {
    align-items: flex-start;
  }
  .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px 16px;
    font-size: 32px;
    line-height: 16px;
  }
}
.actors {
  display: none;
  flex-direction: column;
  
  margin-top: 16px;
  
  &.active {
    display: flex;
  }
  
  .row {
    padding: 8px 16px;
    border-top: 1px solid $border-color;
    
    &:first-child {
      border-top: 0;
    }
  }
}
</style>
