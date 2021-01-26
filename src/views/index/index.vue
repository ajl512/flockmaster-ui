<template lang="pug">
  .index
    f-div(:bgi="img")
    f-div(:bgi="files['bg.png']" w="16.24")
    f-div(relative w="1" h="2" bgc="#000")
</template>
<script>
import divInitMixin from '@/mixins/divInit'
export default {
  assets: require.context('./assets/imgs', true, /.*/),
  name: 'App',
  mixins: [divInitMixin],
  data() {
    return {
      files: {},
      img: ''
    }
  },
  mounted() {
    this.img = this.files['bg.png']
    setTimeout(() => {
      this.img = this.files['button/btn_log.png']
    },2000)
  }
}
</script>
