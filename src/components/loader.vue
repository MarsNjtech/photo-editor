<template>
  <div class="loader" :class="{ 'isdragover': isdragover }" @change="change" @dragleave="dragleave" @dragover="dragover" @drop="drop">
    <i class="fa fa-3x fa-upload"></i>
    <p>Drop image here or
      <label class="browse">browse...
        <input class="sr-only" id="file" type="file"  accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff" capture>
      </label>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isdragover: false
    }
  },
  methods: {
    read (files) {
      return new Promise((resolve, reject) => {
        if (!files || files.length === 0) {
          resolve()
          return
        }

        const file = files[0]

        if (/^image\/\w+$/.test(file.type)) {
          const reader = new FileReader()

          reader.onload = () => {
            this.$store.dispatch('loader/update', {
              loaded: true,
              name: file.name,
              type: file.type,
              url: reader.result
            })

            resolve()
          }

          reader.onerror = reject
          reader.onabort = reject
          reader.readAsDataURL(file)
        } else {
          reject(new Error('Please choose an image file.'))
        }
      })
    },

    change ({ target }) {
      this.read(target.files)
        .then(() => {
          target.value = ''
        })
        .catch(e => {
          target.value = ''
          this.alert(e)
        })
    },

    dragover (e) {
      e.preventDefault()
      this.isdragover = true
    },

    dragleave (e) {
      e.preventDefault()
      this.isdragover = false
    },

    drop (e) {
      e.preventDefault()
      this.read(e.dataTransfer.files).catch(this.alert)
    },

    alert (e) {
      window.alert(e && e.message ? e.message : e)
    }
  }
}
</script>

<style scoped lang="postcss">
.loader {
  display: table;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #ced9da;
  text-align: center;
  padding-top: 100px;
}

.loader p {
  color: #333;
  font-size: 16px;
  margin: 0;
}

.isdragover {
  border: 2px dotted #92b0b3;
}

.browse {
  color: #0074d9;
  cursor: pointer;
  margin-left: 4px;
}

.browse:hover {
  color: #054e8d;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
