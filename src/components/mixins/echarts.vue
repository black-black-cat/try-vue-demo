<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
import theme from '@/utils/theme.mopon'
IEcharts.__echarts__.registerTheme('mopon', theme)

export default {
  components: {
    IEcharts
  }
}
</script>
