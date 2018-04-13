<template>
  <div class="view-user-portrait">
    <gender :male="gender.male" :female="gender.female"></gender>
    <age :pieData="age"></age>
    <people-counting></people-counting>
    <region v-if="cities && cities.length" :cities="cities" :provinces="provinces"></region>
    <city-ratio :region="region"></city-ratio>
  </div>
</template>

<script>
import Gender from './Gender'
import Age from './Age'
import PeopleCounting from './PeopleCounting'
import Region from './Region'
import CityRatio from './CityRatio'

export default {
  components: {
    Gender,
    Age,
    PeopleCounting,
    Region,
    CityRatio
  },
  data () {
    return {
      gender: {},
      age: null,
      cities: null,
      provinces: [],
      region: null
    }
  },
  created () {
    const vm = this
    const _ = vm.$_
    vm.$api.userSexAccountingReport()
      .then(res => {
        if (res.type) return
        vm.gender = vm.$_.mapValues(res.data, v => (v * 100).toFixed(1) + '%')
      })

    vm.$api.userAgeBuyNumReport()
      .then(res => {
        if (res.type) return
        vm.age = vm.$_.map(res.data.series, (v, k) => { return {value: v, name: k + '后'} })
      })

    vm.$api.userAreaBuyNumReport()
      .then(res => {
        if (res.type) return
        let total = (res.data || []).reduce((memo, item) => (+item.saleNumber || 0) + memo, 0)
        let provinceNames = []
        vm.region = vm.$_.each(res.data, v => {
          if (provinceNames.indexOf(vm.provinceName) === -1) {
            provinceNames.push(v.provinceName)
          }
          v.percent = (v.saleNumber * 100 / total).toFixed(1) + '%'
        })
        vm.cities = _.map(res.data, (v, k) => { return {value: v.saleNumber, name: v.cityName} })
        vm.provinces = provinceNames.map((name) => {
          let filtered = res.data.filter(v => v.provinceName === name)
          return {
            name: name,
            value: filtered.reduce((memo, v) => v.saleNumber + memo, 0)
          }
        })
        console.log(vm.provinces)
      })
  }
}
</script>

<style lang="scss" scoped>

</style>
