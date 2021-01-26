<template>
  <div id="app">  
    <div class="wrapper">
      <files :files="visibleBookmarks" @openFolder="openFolder" />
    </div>
    <div class="settings-wrapper">
      <settings />
    </div>
  </div>
</template>

<script>
import Files from "./components/Files"
import Settings from "./components/Settings"
export default {
  name: 'App',
  components: {Files, Settings},
  data() {
    return {
      visibleBookmarks: []
    }
  },
  created() {
    const vi = this
    const imageStorage = localStorage.getItem('imageStorage')
    let parentShortcutsDirrectoryId = localStorage.getItem('parentShortcutsDirrectoryId')
    if (!imageStorage) {
      localStorage.setItem('imageStorage', '{}')
    }
    if (!parentShortcutsDirrectoryId) {
      parentShortcutsDirrectoryId = '1'
    }
    vi.openFolder(parentShortcutsDirrectoryId)
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
.settings-wrapper{
  display: flex;
  position: absolute;
  bottom: 0;
  flex-direction: row-reverse;
  justify-content: flex-start;
  width: 100%;
}
</style>
