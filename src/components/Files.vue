<template>
  <div class="container is-vcentered">
    <div class="columns is-multiline">
      <div v-for="(file, fileIndex) in files" class="column is-3" :key="fileIndex">
        <div class="file-container">
          <file :file="file" @openFolder="openFolder" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import File from "./File"
export default {
  name: "Files",
  components: {File},
  props: {
    files: {
      type: Array,
      required: true
    }
  },
  methods: {
    openFolder(id){
      const vi = this
      vi.$emit('openFolder', id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .file-container{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container{
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>