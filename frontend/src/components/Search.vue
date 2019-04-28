<template>
  <div class="my-container">
   <div class="ad"></div>
   <div class="header"><h2>welcome to guitarsearch</h2></div>
   <div class="search-bar">
     <div class="form-group">
       <label for="search">what are you looking for?</label>
       <input type="text" class="form-control" v-model="searchBar" placeholder='a 25.5" blue fender stratocaster' @input="fetchResults()">
     </div>
   </div>
   <div class="results">
     <div class="list-group">
       <div class="list-group-item" v-for="(guitar,index) in results" :key="index">
         {{`${guitar._source.scale} ${guitar._source.color} ${guitar._source.model} ${guitar._source.brand}, ${guitar._source.finish} finish.`}}</div>
     </div>
   </div>
</div>
</template>

<script>
import dataBulk from '../jsons/guitarsBulk.json'
import elasticService from '../services/elasticsearch'
export default {
  name: 'Search',
  data() {
      return {
        dataBulk,
        elasticService,
        searchBar:'',
        results:[],
      }
  },
  props: {
  },
  mounted(){
    this.insertBulk();
  },
  methods:{
    insertBulk(){
      let bulk = '';
      this.dataBulk.forEach((guitar,index)=>{
        const metaData = { "index" : { "_index" : "guitars","_type" : "_doc", "_id" : index } }
        bulk +=`${JSON.stringify(metaData)}\n${JSON.stringify(guitar)}\n`
      })
      this.elasticService.postBulk(bulk);
    },
    async fetchResults(){
      const query = {
        multi_match:{
          query: this.searchBar,
          fields:this.dataBulk[0].keys,
        }
    }
      this.results = await this.elasticService.search(query);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.my-container{
  height: 800px;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-rows: 15% 15% auto;
  grid-gap: 0;
  grid-template-areas: 
  "header header ad-right"
  "ad-left search ad-right"
  "ad-left results ad-right";
  .ad{
    grid-area: ad-top;
    grid-area: ad-right;
    grid-area: ad-left;
  }
  .header{
    grid-area: header;
  }
  .search-bar{
    grid-area: search;
  }
  .results{
    grid-area: results;
  }
}
</style>
