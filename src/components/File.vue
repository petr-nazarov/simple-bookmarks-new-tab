<template>
  <div class="button is-white file-container" @click="onClick">
    <template v-if="type === 'folder'">
      <b-icon
        pack="fas"
        icon="folder"
        size="is-medium">
      </b-icon>
    </template>
    <template v-if="type === 'file'">
      <figure v-if="img" class="image is-32x32">
        <img :src="img">
      </figure>
    </template>
    {{file.title | title }}
  </div>
</template>

<script>
import axios from 'axios'
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
    // getBookmark(){
    //   const vi = this
    //   chrome.bookmarks.get(vi.file.id, (results)=> {
    //     console.log('results', results);
    //   })
    // }
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

      const imageStorage = JSON.parse(localStorage.getItem('imageStorage'))
      const correspondingFavicon = imageStorage[domain]
      if( correspondingFavicon){
        console.log('Found favicon for', domain);
        vi.img = correspondingFavicon
      } else {
        vi.pullFavicon(domain)
      }
      
    },
    async pullFavicon(domain){
      const vi = this
      const fulllUrl = `http://favicongrabber.com/api/grab/${domain}?pretty=true`
      const data = await axios.get(fulllUrl)
      console.log('data', data.data)
      let favicon
      if(data.data.icons && data.data.icons[0] && data.data.icons[0].src){
        favicon = data.data.icons[0].src
      } else {
        favicon = null
      }

      if(favicon){
        const imageStorage = JSON.parse(localStorage.getItem('imageStorage'))
        imageStorage[domain] = favicon
        localStorage.setItem('imageStorage', JSON.stringify(imageStorage))
        vi.img = favicon
      }
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
</style>