<style scoped lang="stylus">
.dialog-mask
  width 100%
  height 100vh
  background-color rgba(0,0,0,0.8)
  position fixed
  top 0
  left 0
  z-index 998
  display flex
  justify-content center
  align-items center
</style>

<template lang="pug">
.dialog-mask(@close="$emit('close')" v-if="show")
  slot
</template>

<script>
export default {
  name: "f-dialog",
  props: {
    show: Boolean,
  },
  watch: {
    show: {
      immediate: true,
      handler (dialogShow) {
        this.setBodyScrollStatus(dialogShow ? 'hidden' : 'auto')
      }
    }
  },
  methods: {
    // 处理滚动穿透
    setBodyScrollStatus (scrollState = 'auto') {
      if (document.body) {
         document.body.style.overflowY = scrollState
      } else {
        document.documentElement.style.overflowY = scrollState
      }
    }
  }
}
</script>