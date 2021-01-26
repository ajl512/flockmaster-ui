import { getImagesMap } from '@/libs/utils/tool'
import div from '@/components/basis/div'
export default {
  components: {
    'f-div': div
  },
  data() {
    return {
      files: {},
    }
  },

  created() {
    const assetsMap = {...getImagesMap(this.$options['assets'])}
    this.files = Object.freeze(assetsMap)
    this.$route.meta['assets'] = assetsMap
  },
}
