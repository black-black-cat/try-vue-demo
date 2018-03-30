<template>
  <div class="container view-not-found">
    <div class="content">
      <div class="content-icon icon icon-error-tip"></div>
      <div class="content-msg">页面出错了</div>
      <div class="content-msg-sub">出错原因是页面未找到</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/theme";
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.content {
  &-msg {
    padding-top: 30px;
    font-size: 32px;
    color: $c6;
  }
  &-msg-sub {
    padding-top: 12px;
    font-size: 24px;
    color: $c7;
  }
}
</style>
