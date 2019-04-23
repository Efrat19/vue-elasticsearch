<template>
  <div >
   
  </div>
</template>

<script>
import elastic from '../services/elasticsearch'
export default {
  name: 'Search',
  data() {
      return {
          elastic,
      }
  },
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
