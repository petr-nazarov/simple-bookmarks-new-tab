<template>
  <div class="button is-white file-container" @click="onClick">
    <template v-if="type === 'folder'">
      <i class="fas fa-folder folder-icon"></i>
    </template>
    <template v-if="type === 'file'">
      <figure v-if="img" class="image is-32x32">
        <img :src="img">
      </figure>
    </template>
    <p>
      {{file.title | title }}
    </p>
  </div>
</template>

<script>
export default {
  name: "File",
  props: {
    file: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      img: null,
      type: null
    }
  },
  created(){
    const vi = this
    if(vi.file.url && !vi.file.dateGroupModified){
      vi.type = 'file'
      vi.getFavicon(vi.file.url)
    } else {
      vi.type = 'folder' 
    }
    
  },
  methods: {
    onClick(){
      const vi = this
      if (vi.type == 'file'){
        window.open(vi.file.url,'_blank');
      } else if (vi.type == 'folder'){
        vi.$emit('openFolder', vi.file.id)
        console.log('folder');
      }
    },
    async getFavicon(url){
      const vi = this
      const domain  = url.replace(/.+\/\/|\/.+|\//g, '')
      vi.pullFavicon(domain)
    },
    async pullFavicon(domain){
      const vi = this
      vi.img = `https://s2.googleusercontent.com/s2/favicons?sz=128&domain=${domain}`
    }
  },
}
</script>

<style lang="scss" scoped>
  .file-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2em;
    padding-bottom: 2em;
  }

  .folder-icon{
    font-size: 2em;
  }
</style>