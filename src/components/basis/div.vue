<template lang="pug">
  .f-div(:style="divStyle" :class="classObj")
    slot
</template>

<script>
import { whStyleMap, positionTypeMap, bgStyleMap, positionTRBLMap } from '../../libs/config/style-config'
import { setNumAndUnit } from '@/libs/config/unit-config'
import { getImageInfo } from '@/libs/utils/tool'
import { pxTransformToRemRatio, defaultUnit } from '@/config'
export default {
  name:'f-div',
  data() {
    return {
      divStyle: {},
      classObj: []
    }
  },
  watch: {
    "$attrs.bgi":{
      immediate: true,
      handler(src){
        if (!src) {
          return
        }
        getImageInfo(src).then(({ width = 0, height = 0 }) => {
          const style = {}
          style[bgStyleMap['bgi']] = `url(${src})`
          style.backgroundSize = '100% 100%'
          style.width = width / pxTransformToRemRatio + defaultUnit
          style.height = height / pxTransformToRemRatio + defaultUnit
          this.divStyle = { ...this.divStyle, ...style,}
        })
      }
    }
  },
  created() {
    this.divStyle = this.getBasisStyle()
  },
  methods: {
    getBasisStyle() {
      const attrs = this.$attrs
      const attrsKeys = Object.keys(attrs)
      let style = {}
      attrsKeys.forEach(attrKey => {
        if (whStyleMap[attrKey]) {
          style[whStyleMap[attrKey]] = setNumAndUnit(attrs[attrKey])
          delete attrs[attrKey]
          return
        }

        if (positionTRBLMap[attrKey]) {
          style[positionTRBLMap[attrKey]] = setNumAndUnit(attrs[attrKey])
          delete attrs[attrKey]
          return
        }

        if (positionTypeMap[attrKey]) {
          Object.assign(style, positionTypeMap[attrKey])
          delete attrs[attrKey]
          return
        }

        if (attrKey === 'bgc') {
          style[bgStyleMap[attrKey]] = attrs[attrKey]
          delete attrs[attrKey]
        }
      })
      this.classObj = Object.keys(attrs)
      return style
    },
  }
}
</script>
<style lang="stylus" scoped>
.px-c
  left 50%
  transform translateX(-50%)
.py-c
  top 50%
  transform translateY(-50%)
.pxy-c
  position: absolute
  left 50%
  top 50%
  transform translate3d(-50%,-50%,0)
.fx-c
  display flex
  justify-content center
.fy-c
  display flex
  align-items center
.fxy-c
  display flex
  align-items center
  justify-content center
// *        字体大小            *
// * **************************/
for size in range(16, 50, 2)
  .fz-{size}
    font-size: (size/100) rem
</style>