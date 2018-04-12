<template>
  <div class="m-tourist-record">
    <i class="close icon icon-close-2" @click="close"></i>
    <div class="hero"></div>
    <div class="row">
      {{label}}{{name}}
    </div>
    <div class="list">
      <div class="head">
        <div class="col">入园日期</div>
        <div class="col">入园次数</div>
        <div class="col">同行人数</div>
      </div>
      <ul class="list-content">
        <!-- eslint-disable-next-line -->
        <li class="item" v-for="item in details">
          <div class="col">{{item.usedDate}}</div>
          <div class="col highlight"><span class="col-inner">{{item.usedCount}}</span></div>
          <div class="col"><span class="col-inner">{{item.usedPersion}}</span></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    label: String,
    details: Array
  },
  data () {
    return {

    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/theme";

.m-tourist-record {
  position: relative;
  width: 650px;
  border-radius: 20px;
}
.close {
  position: absolute;
  top: 24px;
  right: 24px;
}
.hero {
  width: 100%;
  height: 456px;
  background: url('../../assets/images/tourist.gif') no-repeat;
  background-size: 754px 456px;
  background-position: -52px -1px;
}
.row {
  padding: 22px 0 30px;
  font-size: 30px;
}
.list {
  max-height: 90px * 5 + 60px;
  overflow: auto;
  font-size: 28px;
  &-content {
    padding: 0 28px;
  }
  .item, .head {
    display: flex;
    align-items: center;
  }
  .head {
    height: 60px;
    padding: 0 28px;
  }
  .item {
    height: 90px;
    .col {
      &-inner{
        padding-right: 1.6em;
      }
      &:first-child {
        font-weight: 600;
      }
    }
  }
  .col {
    // flex-grow: 1;
    width: 33.33%;
    text-align: right;
    &:first-child {
      text-align: left;
    }
  }
}
</style>
