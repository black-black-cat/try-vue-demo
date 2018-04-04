<template>
  <div class="m-sales-list">
    <div class="m-sales-list-head">
      <div class="item">销售时间</div>
      <div class="item">销售金额</div>
      <div class="item">商品数量</div>
    </div>
    <ul class="m-sales-list-content">
      <!-- eslint-disable-next-line -->
      <li v-for="i in 'aaaaa'.split('')">
        <div class="col">
          <span>2018-03-15</span>
          <span>星期四</span>
        </div>
        <div class="col">1.33</div>
        <div class="col">1234</div>
      </li>
    </ul>
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
@import "../../styles/mixins";
@import "../../styles/theme";
.m-sales-list {
  &-head {
    display: flex;
    align-items: center;
    height: 80px;
    padding: 0 28px;
    .item {
      flex-grow: 1;
      font-size: 24px;
      &:first-child {
        text-align: left;
      }
      &:last-child {
        text-align: right;
      }
    }
  }
  &-content {
    font-size: 28px;
    li {
      display: flex;
      align-items: center;
      height: 116px;
      padding: 0 28px;
      .col {
        flex-grow: 1;

        >span {
          display: block;
          &:nth-child(2) {
            padding-top: 8px;
            font-size: 24px;
          }
        }

        &:first-child {
          flex-grow: 0;
          text-align: left;
          width: 33.33%;
        }
        &:last-child {
          text-align: right;
          transform: translatex(-0.5em);
        }
      }
    }
  }
}
</style>
