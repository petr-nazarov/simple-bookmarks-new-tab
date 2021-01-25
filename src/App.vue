<template>
  <div id="app">    
    <files :files="visibleBookmarks" @openFolder="openFolder" />
  </div>
</template>

<script>
import Files from "./components/Files"
export default {
  name: 'App',
  components: {Files},
  data() {
    return {
      visibleBookmarks: []
    }
  },
  created() {
    const vi = this
    const imageStorage = localStorage.getItem('imageStorage')
    if (!imageStorage) {
      localStorage.setItem('imageStorage', '{}')
    }
    vi.openFolder('1')
  },
  methods: {
    openFolder(id = '1') {
      const vi = this
      vi.visibleBookmarks = []
      chrome.bookmarks.getChildren(id, (children) => {
        console.log(children)
        vi.visibleBookmarks = children
      })
    }
  }
};
</script>

<style lang="scss">
@import './assets/styles/main.scss';
</style>
