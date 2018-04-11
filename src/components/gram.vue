<template>
  <div class="filters">
    <li v-for='item in filters' :key="item.id">
      <img :src="loader.url" width="100px" height="60px" :class="item" :title="item" @click="changeStyle(item)">
    </li>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'gram',
  data () {
    return {
      filters: ['xpro2', 'aden', 'amaro', 'brannan', 'willow', 'perpetua', 'clarendon', 'reyes', 'earlybird', 'lofi']
    }
  },
  computed: {
    loader () {
      return this.$store.state.loader
    }
  },
  methods: {
    changeStyle (style) {
      const image = $('.cropper-canvas').children('img')
      image.removeAttr('class')
      image.addClass(style)
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
