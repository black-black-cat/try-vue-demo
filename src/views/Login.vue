<template>
  <div class="container view-login">
    <div class="bg-top"></div>
    <div class="form">
      <div class="form-head">景区大数据分析</div>
      <div class="form-body">
        <div class="form-item">
          <i class="icon login-user"></i>
          <input type="text" maxlength="12">
        </div>
        <div class="form-item">
          <i class="icon login-password"></i>
          <input type="password" maxlength="6">
        </div>
        <div class="form-item">
          <i class="icon login-vcode"></i>
          <input type="text" maxlength="4">
        </div>
      </div>
      <div class="form-bottom">
        <div class="form-submit">登录</div>
      </div>
    </div>
    <div class="bottom-logo">
      <i class="line"></i>
      <i class="icon logo"></i>
      <i class="line"></i>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
    // this.$toast('kkk')
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/_mixins';
@import '../styles/theme';

.container {
  position: relative;
  height: 100vh;
}
.bg-top {
  height: 368px;
  @include imgBg('login-bg-top.jpg');
  background-size: 750px 368px;
}
.form {
  @include clearfix();
  margin: -130px 40px 0 40px;
  padding-bottom: 60px;
  border-radius: 8px;
}
.form-head {
  padding-top: 56px;
  font-size: 42px;
}
.form-body {
  margin: 0 50px;
  padding-top: 24px;
}
.form-item {
  display: flex;
  align-items: center;
  height: 96px;
  .icon {
    flex-shrink: 0;
    margin-right: 30px;
  }
  >input {
    padding: 34px 0;
    font-size: 28px;
  }
}
.form-bottom {
  margin: 50px 50px 0;
}
.form-submit {
  height: 88px;
  border-radius: 88px;
  font-size: 32px;
  line-height: 88px;
}
.bottom-logo {
  position: absolute;
  bottom: 60px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .line {
    width: 108px;
    height: 2px;
    margin: 0 18px;
  }
}
</style>
