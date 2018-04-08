<template>
  <div class="m-gender">
    <section-title>游客性别占比</section-title>
    <div class="content">
      <div class="content-text">
        <div class="left">
          <span>男</span>
          <span class="num">{{male}}</span>
        </div>
        <div class="right">
          <span class="num">{{female}}</span>
          <span>女</span>
        </div>
      </div>
      <div class="content-bar">
        <div class="left"></div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    male: String,
    female: String
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/theme";
.content {
  padding: 40px 28px 60px;
  &-text {
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    .num {
      font-size: 40px;
    }
  }
  &-bar {
    display: flex;
    justify-content: center;
    padding-top: 14px;
    .left, .right {
      height: 20px;
    }
    .left {
      width: 68.3%;
      margin-right: 4px;
      border-radius: 20px 0 0 20px;
    }
    .right {
      width: 31.7%;
      border-radius: 0 20px 20px 0;
    }
  }
}
</style>
