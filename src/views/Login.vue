<template>
  <div>
    <div class="form">
      <div class="form-head">景区大数据分析</div>
      <div class="icon bg-btn-code"></div>
      <div class="form-body">
        <div class="form-item">
          <input type="text" maxlength="12">
        </div>
        <div class="form-item">
          <input type="password" maxlength="6">
        </div>
        <div class="form-item">
          <input type="text" maxlength="4">
        </div>
      </div>
      <div class="form-bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
    // this.$indicator.open()
  }
}
</script>

<style lang="scss">
$font: 150px;
body {
  font-size: $font;
}
.form {
  margin: $font;
}
</style>
