<template>
    <v-layout>
      <v-flex justify-center column flex-wrap>
        <h1>Click on the image to upload new image</h1>
        <template v-if="length > 1">
          <div class="img-wrapper">
            <div class="img-container" v-for="(file, index) in files" :key="index">
              <img :src="file.url" @click="uploadImage" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="img-wrapper">
            <div class="img-container">
              {{ files.length }}
              <img :src="files[0].url" @click="uploadImage" />
            </div>
          </div>
        </template>
        <input type="file" multiple accpet="" ref="uploadFileReference" @change="uploadFileReference" />
      </v-flex>
    </v-layout>
</template>

<script>
export default {
  data () {
    return {
      length: 1,
      files: [
        {
          id: 1,
          url:
            'https://utmsi.utexas.edu/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
        }
      ]
    }
  },
  methods: {
    uploadImage () {
      this.$refs.uploadFileReference.click()
    },
    uploadFileReference (e) {
      const files = e.target.files || e.dataTransfer.files
      this.length = files.length

      this.showImage(files)
    },
    showImage (files) {
      // if (files.length > 1) {
      this.files = []
      /** Solution provided by Chem **/
      const test = Array.from(files).forEach((file, idx) => {
        const fileReader = new FileReader()
        const getResult = new Promise(resolve => {
          fileReader.onload = e => {
            this.files.push({
              id: idx,
              url: e.target.result
            })
          }
        })

        fileReader.readAsDataURL(file)
        return getResult.then(file => {
          return file
        })
      })
      // }
      /*
      } else {
        const fileReader = new FileReader();
        fileReader.onload = e => {
          this.files[0].id = 1;
          this.files[0].url = e.target.result;
        };
        fileReader.readAsDataURL(files[0]);
      }
      */
    }
  }
}
</script>

<style scoped>
input[type="file"] {
  display: none;
}
.img-wrapper {
  display: flex;
  flex: 1 0 100%;
  flex-direction: row;
  align-items: center;
}
.img-container {
  width: 10rem;
  height: 15rem;
}
img {
  max-width: 100%;
}
</style>
