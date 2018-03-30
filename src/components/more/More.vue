<template>
  <div>
    <router-link class="link" :to="target">
      <span>查看更多</span>
      <i class="icon icon-more"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'more',
  data () {
    return {}
  },
  props: {
    target: {
      type: String,
      default: '404'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/theme";

.link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 108px;
  font-size: 30px;
  background-color: $c0;

  >i {
    margin-left: 10px;
  }
}
</style>
