<template>
  <div class="m-tourist-list">
    <div class="m-tourist-list-head">
      <div class="item">游客</div>
      <div class="item">游玩次数</div>
      <div class="item">消费金额(元)</div>
    </div>
    <ul class="m-tourist-list-content" @click="onListClicked($event)">
      <!-- eslint-disable-next-line -->
      <li v-for="(item, i) in details" :data-index="i">
        <div class="col">
          <span>{{item.userName}}</span>
          <span>{{item.labelName}}</span>
        </div>
        <div class="col">{{item.personNum}}</div>
        <div class="col">{{item.amount}}</div>
      </li>
    </ul>
    <van-popup v-model="popupShow">
      <tourist-record :name="tourist.name"
      :label="tourist.label" :details="itemData"
      @close="closePopup"
      ></tourist-record>
    </van-popup>
  </div>
</template>

<script>
import closest from 'dom-helpers/query/closest'
import TouristRecord from './TouristRecord'

export default {
  components: {
    TouristRecord
  },
  props: {
    details: Array
  },
  data () {
    return {
      popupShow: false,
      itemData: null,
      tourist: {
        name: '',
        label: ''
      }
    }
  },
  methods: {
    onListClicked (ev) {
      const vm = this
      let target = ev.target
      let elem = closest(target, 'li')
      // console.log(this.details[elem.dataset.index].userName)
      let user = this.details[elem.dataset.index] || {}
      this.$api.userLabelUsedDetail({userName: user.userName})
        .then(res => {
          if (res.type) return
          vm.itemData = res.data
          vm.tourist = {
            name: user.userName,
            label: user.labelName
          }
          vm.popupShow = true
        })
    },
    closePopup () {
      this.popupShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "../../styles/theme";
.m-tourist-list {
  &-head {
    display: flex;
    align-items: center;
    height: 80px;
    padding: 0 28px;
    .item {
      flex-grow: 1;
      flex-shrink: 0;
      font-size: 24px;
      &:first-child {
        flex-grow: 0;
        flex-shrink: 0;
        width: 278px;
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
          &:nth-child(1) {
            font-weight: 600;
          }
          &:nth-child(2) {
            font-size: 80%;
            padding-top: 8px;
          }
        }

        &:first-child {
          flex-grow: 0;
          flex-shrink: 0;
          text-align: left;
          width: 278px;
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

<style>
.van-popup {
  background-color: transparent;
}
</style>
