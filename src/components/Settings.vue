<template>
  <div>
    <b-modal v-model="activeModal">
      <div class="container has-background-white">
        <b-tabs v-model="activeTab">
            <b-tab-item label="Shortcuts">
              <b-field label="Parent shortcuts dirrectory">
                  <b-select placeholder="Select a name" v-model="selectedStartDirectory">
                      <option
                          v-for="option in startDirectoryOptions"
                          :value="option.id"
                          :key="option.id">
                          {{ option.title }}
                      </option>
                  </b-select>
              </b-field>
              <b-button type="is-success" @click="save()">Save</b-button>

            </b-tab-item>

        </b-tabs>

      </div>
    </b-modal>
    <b-button 
      size="is-small"
      icon-pack="fas"
      icon-left="cog"
      @click="activeModal = !activeModal">
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  created(){
    const vi = this
    chrome.bookmarks.getChildren('1', (children) => {
      vi.startDirectoryOptions = children.filter(el => !el.url && el.dateGroupModified)
    })
    let parentShortcutsDirrectoryId = localStorage.getItem('parentShortcutsDirrectoryId')
    if (!parentShortcutsDirrectoryId) {
      parentShortcutsDirrectoryId = '1'
    }
    vi.selectedStartDirectory = parentShortcutsDirrectoryId
  },
  data(){
    return{
      activeModal: false,
      startDirectoryOptions: [],
      selectedStartDirectory: null,
      activeTab: 0,
    }
  },
  methods: {
    save(){
      const vi = this
      localStorage.setItem('parentShortcutsDirrectoryId', vi.selectedStartDirectory)
      vi.activeModal = false
      location.reload();
    }
  }
}
</script>