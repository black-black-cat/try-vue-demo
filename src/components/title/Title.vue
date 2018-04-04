<template>
  <div class="m-title">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'section-title',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/theme";
.m-title {
  padding: 50px 28px 0;
  font-size: 34px;
  font-weight: 600;
  text-align: left;
  background-color: $c0;
}
</style>
