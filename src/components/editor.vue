<template>
    <div class="editor">
      <div class="canvas">
        <img ref="image" :src="loader.url" @load="start" :alt="loader.name">
      </div>
      <div class="toolbar" v-if="cropper" @click="click">
        <button class="toolbar__button" data-action="move" title="Move (M)"><span class="fa fa-arrows"></span></button>
        <button class="toolbar__button" data-action="crop" title="Crop (C)"><span class="fa fa-crop"></span></button>
        <button class="toolbar__button" data-action="zoom-in" title="Zoom In (I)"><span class="fa fa-search-plus"></span></button>
        <button class="toolbar__button" data-action="zoom-out" title="Zoom Out (O)"><span class="fa fa-search-minus"></span></button>
        <button class="toolbar__button" data-action="rotate-left" title="Rotate Left (L)"><span class="fa fa-rotate-left"></span></button>
        <button class="toolbar__button" data-action="rotate-right" title="Rotate Right (R)"><span class="fa fa-rotate-right"></span></button>
        <button class="toolbar__button" data-action="flip-horizontal" title="Flip Horizontal (H)"><span class="fa fa-arrows-h"></span></button>
        <button class="toolbar__button" data-action="flip-vertical" title="Flip Vertical (V)"><span class="fa fa-arrows-v"></span></button>
        <button type="button" class="toolbar__button" data-action="cropTest" title="OK (Enter)" v-show="editor.cropping"><span class="fa fa-check"></span></button>
        <button type="button" class="toolbar__button" data-action="clear" title="Cancel (Esc)" v-show="editor.cropping"><span class="fa fa-ban"></span></button>
        <!-- <button class="toolbar__button" title="Download" data-action="download" :download="loader.name" v-if="loader.loaded"><span class="fa fa-download"></span></button> -->
        <a class="nav__button nav__button--success" title="Download" :download="loader.name" :href="loader.url" v-if="downloadable && loader.loaded"><span class="fa fa-download"></span></a>
    </div>
    </div>
</template>

<script>
import Cropper from 'cropperjs'
// import $ from 'jquery'

export default {
  data () {
    return {
      cropper: null,
      canvasData: null,
      cropBoxData: null,
      data: null,
      downloadable: typeof document.createElement('a').download !== 'undefined'
    }
  },

  computed: {
    editor () {
      return this.$store.state.editor
    },

    loader () {
      return this.$store.state.loader
    }
  },

  methods: {
    click ({ target }) {
      const cropper = this.cropper
      const action = target.dataset.action || target.parentNode.dataset.action
      switch (action) {
        case 'move':
          break
        case 'crop':
          cropper.setDragMode('crop')
          this.crop(this.$refs.image)
          break
        case 'zoom-in':
          cropper.zoom(0.1)
          break
        case 'zoom-out':
          cropper.zoom(-0.1)
          break
        case 'cropTest':
          this.cropTest()
          break
        case 'clear':
          this.clear()
          break
        case 'download':
          this.download()
          break
        default:
      }
    },
    start () {
      const editor = this.editor
      if (editor.cropped) {
        return ''
      }
      this.cropper = new Cropper(this.$refs.image, {
        autoCrop: false, // 这些属性要知道
        dragMode: 'move',
        background: false,
        ready: () => {
          if (!this.editor.cropped) {
            this.data = null
            this.canvasData = null
            this.cropBoxData = null
          }
        }
      })
    },
    crop (detail) {
      if (detail.width > 0 && detail.height > 0 && !this.editor.cropping) {
        this.$store.dispatch('editor/update', {
          cropping: true
        })
      }
    },

    cropTest () {
      const cropper = this.cropper
      const { type } = this.loader
      if (this.editor.cropping) {
        this.data = cropper.getData()
        this.canvasData = cropper.getCanvasData()
        this.cropBoxData = cropper.getCropBoxData()
        this.$store.dispatch('editor/update', {
          cropped: true,
          cropping: false
        })
        const url = cropper.getCroppedCanvas(type === 'image/png' ? null : { fillColor: '#fff' }).toDataURL(type)
        this.$store.dispatch('loader/update', {
          url: url
        })
        cropper.destroy()
        this.start()
        this.$store.dispatch('editor/update', {
          cropped: false
        })
      }
    },

    clear () {
      if (this.editor.cropping) {
        this.cropper.clear()
        this.cropper.setDragMode('move')
        this.$store.dispatch('editor/update', {
          cropping: false
        })
      }
    }
  }
}
</script>

<style scoped>
  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .editor {
    height: 100%;
  }

  .canvas {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
  }

  .canvas > img {
    max-width: 100%;
    max-height: 100%;
  }

  .toolbar {
    bottom: 16px;
    color: #fff;
    height: 32px;
    left: 50%;
    margin-left: -128px;
    position: absolute;
    width: 352px;
    z-index: 2015;
  }

  .toolbar button {
    background-color: transparent;
    border-width: 0;
    color: #fff;
    cursor: pointer;
    display: block;
    float: left;
    font-size: 14px;
    height: 32px;
    text-align: center;
    width: 32px;
  }

  .toolbar a {
    background-color: transparent;
    border-width: 0;
    color: #fff;
    cursor: pointer;
    display: block;
    float: left;
    font-size: 14px;
    height: 32px;
    text-align: center;
    width: 32px;
    line-height: 32px;
  }

  .toolbar a:hover {
    background-color: #0074d9;
    color: #fff;
  }

  .toolbar a:focus {
    outline: none;
  }

  .toolbar button:focus {
    outline: none;
  }

  .toolbar button:hover {
    background-color: #0074d9;
    color: #fff;
  }
</style>
