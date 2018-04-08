<template>
  <div class="m-city-ratio-list">
    <ul>
      <!-- eslint-disable-next-line -->
      <li class="item" v-for="(item, i) in region">
        <div class="left">{{i+1}}.{{item.cityName}}</div>
        <div class="center">
          <div class="bar-wrapper">
            <div class="bar" :class="{highlight: i === 0}" :style="{width: item.percent}"></div>
          </div>
        </div>
        <div class="right" :class="{highlight: i === 0}">{{item.percent}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    region: Array
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/theme";

.m-city-ratio-list {
  @include clearfix;
  background-color: $c0;

  >ul {
    @include clearfix;
  }
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 60px 0;
  padding: 0 28px;
  font-size: 30px;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 60px;
  }

  .left {
    flex-shrink: 0;
    padding-right: 50px;
    font-weight: 600;
  }
  .center {
    width: 100%;
    .bar-wrapper {
      width: 438px;
      height: 20px;
      border-radius: 20px;
      background-color: $c11;

      .bar {
        width: 80%;
        height: 100%;
        border-radius: 20px;
        background-color: $c1;

        &.highlight {
          background-color: $c4;
        }
      }
    }
  }
  .right {
    flex-shrink: 0;
    padding-left: 36px;
    font-weight: 600;
    color: $c1;

    &.highlight {
      color: $c4;
    }
  }
}
</style>
