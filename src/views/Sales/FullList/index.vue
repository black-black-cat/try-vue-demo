<template>
  <div>
    <sales-list v-if="details && details.length" :details="details"/>
  </div>
</template>

<script>
import SalesList from '../SalesList'
import bus from '@/store/bus'

export default {
  components: {
    SalesList
  },
  data () {
    return {
      details: []
    }
  },
  mounted () {
    bus.$emit('Sales.FullList.mounted', this)
  }
}
</script>

<style lang="scss">

</style>
