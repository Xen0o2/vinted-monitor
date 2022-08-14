import Query from "./Query.js";


export default class List {
    url: string;
    items: [] = [];

    constructor(url: string){
        this.url = url;
        return this;
    }
    
    async initialize(timeRange: number){
        const items = await new Query(this.url).send(timeRange);
        this.items = (items || {});
        return this.items;
    }
}