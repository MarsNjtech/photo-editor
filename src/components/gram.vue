<template>
  <div class="filters">
    <li v-for='item in filters' :key="item.id">
      <img :src="loader.url" width="100px" height="60px" :class="item" :title="item" @click="changeStyle(item)">
    </li>
  </div>
</template>

<script>
import $ from 'jquery'
import filters from '../filter/instaFilters'
export default {
  name: 'gram',
  data () {
    return {
      filters: ['moon', 'aden', 'amaro', 'brannan', 'willow', 'perpetua', 'clarendon', 'reyes', 'earlybird', 'lofi']
    }
  },
  computed: {
    loader () {
      return this.$store.state.loader
    }
  },
  methods: {
    changeStyle (style) {
      const image = $('.canvas').children('img')
      const innerImage = $('.cropper-canvas').children('img')
      console.log(style)
      innerImage.removeAttr('class')
      innerImage.addClass(style)
      /* 删除原来的元素 */
      $('#newCanvas').remove()
      const newCanvas = document.createElement('canvas')
      newCanvas.id = 'newCanvas'
      /* 获取原始的图片大小 */
      newCanvas.width = image[0].naturalWidth
      newCanvas.height = image[0].naturalHeight
      /* 隐藏添加的元素 */
      $('#newCanvas').addClass('cropper-hidden')
      $('.cropper-canvas').append(newCanvas)
      /* 获取 canvas 上下文 */
      const context = $('#newCanvas')[0].getContext('2d')
      context.drawImage(image[0], 0, 0, newCanvas.width, newCanvas.height)
      const pixels = context.getImageData(0, 0, newCanvas.width, newCanvas.height)
      /* 滤镜操作 */
      filters.forEach(element => {
        if (element.name === style) {
          context.putImageData(element(pixels), 0, 0)
        }
      })
      this.$store.dispatch('loader/update', {
        url: $('#newCanvas')[0].toDataURL()
      })
    }
  }
}
</script>

<style scoped>
  .filters {
    display: flex;
    justify-content: center;
    background-color: #21252b;
  }

  .filters li {
    list-style-type: none;
    margin: 0 4px;
  }
</style>
