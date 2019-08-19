<template>
  <div class="home">
    <h1>Celeb Follower</h1>
    <Search />
    <Results />
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue'
import Results from '@/components/Results.vue'

export default {
  name: 'home',
  components: {
    Search,
    Results,
  },
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-direction: column;
  
  height: 100%;
}
</style>
