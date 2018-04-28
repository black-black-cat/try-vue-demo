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
        <transition name="scalex">
          <div class="left" v-if="anim" :style="styleMale"></div>
        </transition>
        <transition name="scalex">
          <div class="right" v-if="anim" :style="styleFemale"></div>
        </transition>
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
      anim: false
    }
  },
  mounted () {
    const vm = this
    this.$nextTick(() => {
      // vm.anim = true
    })
    setTimeout(() => {
      vm.anim = true
    }, 1000)
  },
  computed: {
    styleMale () {
      return {
        width: this.male,
        transformOrigin: '100% 50%'
      }
    },
    styleFemale () {
      return {
        width: this.female,
        transformOrigin: '0 50%'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/theme";
.scalex-enter-active, .scalex-leave-active {
  transition: transform .5s;
  transform: scale(1);
}
.scalex-enter, .scalex-leave-to {
  transform: scale(0);
}
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
      width: 0;
      margin-right: 4px;
      border-radius: 20px 0 0 20px;
    }
    .right {
      width: 0;
      border-radius: 0 20px 20px 0;
    }
  }
}
</style>
