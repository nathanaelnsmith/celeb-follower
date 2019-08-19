<template lang="html">
  <div class="search">
    <input @input="searchQuery" />
  </div>
</template>

<script>
export default {
  methods: {
    searchQuery(val) {
      // console.log()
      // this.$emit('input', val.target.value);
      this.$store.dispatch('search', val.target.value);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/settings.scss";
.search {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
input {
  border: 1px solid $input-border;
  width: 100%;
  height: 30px;
}
</style>
