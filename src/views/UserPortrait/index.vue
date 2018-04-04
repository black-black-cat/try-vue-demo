<template>
  <div class="view-user-portrait">
    <gender></gender>
    <age></age>
    <people-counting></people-counting>
    <region></region>
  </div>
</template>

<script>
import Gender from './Gender'
import Age from './Age'
import PeopleCounting from './PeopleCounting'
import Region from './Region'

export default {
  components: {
    Gender,
    Age,
    PeopleCounting,
    Region
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
