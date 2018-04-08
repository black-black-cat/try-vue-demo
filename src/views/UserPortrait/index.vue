<template>
  <div class="view-user-portrait">
    <gender :male="gender.male" :female="gender.female"></gender>
    <age :pieData="age"></age>
    <people-counting></people-counting>
    <region :cities="cities"></region>
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
      gender: null,
      age: null,
      cities: null,
      region: null
    }
  },
  created () {
    const vm = this
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
        vm.region = vm.$_.each(res.data, v => {
          v.percent = (v.saleNumber * 100 / total).toFixed(1) + '%'
        })
        vm.cities = vm.$_.map(res.data, (v, k) => { return {value: v.saleNumber, name: v.cityName} })
      })
  }
}
</script>

<style lang="scss" scoped>

</style>
