<template>
  <div class="view-revisit-full-list">
    <revisit-list v-if="details && details.length" :details="details"/>
  </div>
</template>

<script>
import RevisitList from '../RevisitList'
import bus from '@/store/bus'

export default {
  components: {
    RevisitList
  },
  data () {
    return {
      details: [],
      year: 0
    }
  },
  mounted () {
    const vm = this
    bus.$emit('Revisit.FullList.mounted', vm)
    console.log(vm.year)
    if (!vm.year) {
      console.log(vm.$router)
      vm.$router.replace('/revisit')
    }
    this.$api.userReLabelDetailReport({year: vm.year})
      .then(res => {
        if (res.type) return
        vm.details = res.data.map(v => {
          v.strPercent = (v.percent * 100).toFixed(1) + '%'
          return v
        }) || []
      })
  }
}
</script>

<style lang="scss">

</style>
