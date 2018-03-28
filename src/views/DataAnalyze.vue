<template>
  <div>
    <div class="nav view-data-analyze">
      <div class="nav-item"></div>
      <div class="nav-item"></div>
      <div class="nav-item"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/theme';
.nav {
  padding: 20px 28px 40px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  font-size: 0;
  &-item {
    display: inline-block;
    width: 256px;
    height: 140px;
    margin: 0 12px;
    font-size: 30px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
