<template lang="pug">
  .index
    f-div(:bgi="img")
    f-div(fz-20 p-c-c) 这里是字体
    f-div(relative w="1" h="2" bgc="#000") 
    f-dialog(:show="showMask")
</template>
<script>
import divInitMixin from '@/mixins/divInit'
import fDialog from '../../components/interaction/dialog'
export default {
  assets: require.context('./assets/imgs', true, /.*/),
  name: 'App',
  mixins: [divInitMixin],
  components: { fDialog },
  data() {
    return {
      files: {},
      img: '',
      showMask: true,
    }
  },
  mounted() {
    this.img = this.files['bg.png']
    setTimeout(() => {
      this.img = this.files['button/btn_log.png']
      this.showMask = false
    },2000)
  }
}
</script>
