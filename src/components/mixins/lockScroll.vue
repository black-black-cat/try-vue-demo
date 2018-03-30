<script>
import scrollUtils from 'vant/lib/utils/scroll'

export default {
  methods: {
    onTouchStart (e) {
      this.pos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
    },

    onTouchMove (e) {
      const { pos } = this
      const dx = e.touches[0].clientX - pos.x
      const dy = e.touches[0].clientY - pos.y
      const direction = dy > 0 ? '10' : '01'
      const el = scrollUtils.getScrollEventTarget(e.target, this.$el)
      // console.log(el)
      const { scrollHeight, offsetHeight, scrollTop } = el
      const isVertical = Math.abs(dx) < Math.abs(dy)

      let status = '11'

      /* istanbul ignore next */
      if (scrollTop === 0) {
        status = offsetHeight >= scrollHeight ? '00' : '01'
      } else if (scrollTop + offsetHeight >= scrollHeight) {
        status = '10'
      }

      // console.log('d', direction)
      // console.log('s', status)
      /* istanbul ignore next */
      if (
        status !== '11' &&
        isVertical &&
        !(parseInt(status, 2) & parseInt(direction, 2))
      ) {
        e.preventDefault()
        // e.stopPropagation()
      }
    }
  }
}
</script>
