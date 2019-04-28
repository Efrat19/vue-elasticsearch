import elasticsearch from 'elasticsearch';

class ElasticSearch {
    constructor(){
        this.client = new elasticsearch.Client({
            host: 'localhost:9222',
          });
    }
    startElastic(){

    }
    createGuitarIndex(){

    }
    postBulk(bulk){
        this.client.bulk({body:bulk});
    }
    putDoc(){

    }
    deleteDoc(){

    }
    async search(query){
        const body = {
            query,
            size: 200,
            from : 0,
        }
        const res = await this.client.search({index:'guitars',type:'_doc',body});
        return res.hits.hits;
    }
}
export default new ElasticSearch();