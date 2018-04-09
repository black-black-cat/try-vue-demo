<template>
  <div class="m-sales-list">
    <div class="m-sales-list-head">
      <div class="item">渠道名称</div>
      <div class="item">销售占比</div>
      <div class="item">销售金额</div>
    </div>
    <ul class="m-sales-list-content">
      <!-- eslint-disable-next-line -->
      <li v-for="(item, i) in details">
        <div class="col">
          <span>{{i+1}}</span>
          <span>{{item.channelName}}</span>
        </div>
        <div class="col">{{item.strPercent}}</div>
        <div class="col">{{item.strAmount}}</div>
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
          // display: block;
          &:nth-child(2) {
            padding-top: 8px;
            font-size: 28px;
            font-weight: 600;
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
