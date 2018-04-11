<template>
  <div class="m-revisit-list">
    <div class="m-revisit-list-head">
      <div class="item">月份</div>
      <div class="item">重游占比</div>
      <div class="item">重游数量(人)</div>
      <div class="item">销售金额(元)</div>
    </div>
    <ul class="m-revisit-list-content">
      <!-- eslint-disable-next-line -->
      <li v-for="(item, i) in details">
        <div class="col">
          {{item.month}}
        </div>
        <div class="col">{{item.strPercent}}</div>
        <div class="col">{{item.retravelNum}}</div>
        <div class="col">{{item.amount}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    details: Array
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "../../styles/theme";
.m-revisit-list {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  &-head {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    height: 80px;
    padding: 0 28px;
    .item {
      flex-grow: 1;
      width: 25%;
      font-size: 24px;
      &:first-child {
        text-align: left;
      }
      // &:last-child {
      //   text-align: right;
      // }
    }
  }
  &-content {
    flex-grow: 1;
    overflow: auto;
    font-size: 28px;
    li {
      display: flex;
      align-items: center;
      height: 116px;
      padding: 0 28px;
      .col {
        flex-grow: 1;
        width: 25%;

        >span {
          // display: block;
          &:nth-child(2) {
            padding-top: 8px;
            font-size: 28px;
            font-weight: 600;
          }
        }

        &:first-child {
          // flex-grow: 0;
          text-align: left;
          // width: 33.33%;
        }
        &:last-child {
          // text-align: right;
          // transform: translatex(-0.5em);
        }
      }
    }
  }
}
</style>
