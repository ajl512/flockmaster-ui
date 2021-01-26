<template lang="pug">
  .f-div(:style="divStyle")
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
      divStyle: {}
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
      let style = {}
      Object.keys(attrs).forEach(attrKey => {
        if (whStyleMap[attrKey]) {
          style[whStyleMap[attrKey]] = setNumAndUnit(attrs[attrKey])
          return
        }

        if (positionTRBLMap[attrKey]) {
          style[positionTRBLMap[attrKey]] = setNumAndUnit(attrs[attrKey])
          return
        }

        if (positionTypeMap[attrKey]) {
          Object.assign(style, positionTypeMap[attrKey])
        }

        if (attrKey === 'bgc') {
          style[bgStyleMap[attrKey]] = attrs[attrKey]
        }
      })
      return style
    },
  }
}
</script>