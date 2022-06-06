import List from "./List.js";
import VintedItem from "./VintedItem.js";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export default class VintedMonitor {
    private cache: any[] = [];
    vintedEvent: CallableFunction | undefined;

    // Example : https://www.vinted.be/vetements?search_text=casquette&brand_id[]=362&order=newest_first&color_id[]=12
    watch(url: string){
        if(url.match(/https:\/\/www\.vinted\.\w{2}\/vetements\?/g) == null) throw "Invalid URL";
        this.cache.push({subUrl:url.replace(".fr",".be"),items:[], list:[]});
        this.check(this.cache.length - 1, true);
        return this;
    }

    onItemFound(callback: CallableFunction){
        this.vintedEvent = callback;
    }

    private async check(id: number, request: boolean){
        const url = this.cache[id]?.subUrl;
        if(request) this.cache[id].list = await new List(url).initialize(), console.log("liste de " + Object.keys(this.cache[id].list).length,"objet");

        const newItem = new VintedItem(Object.values(this.cache[id].list).find((item: any) => !this.cache[id].items.find((e: any) => e.id == item.id)));
        const finishedItem = await newItem.initialize();
        if(finishedItem){
            if(finishedItem == "rateLimit"){
                console.log("je suis ratelimit, j'attends")
                await sleep(5000)
                this.check(id, false)
            } else {
                this.cache[id].items.push(finishedItem);
                if(this.vintedEvent) this.vintedEvent(newItem);
                await sleep(1000);
                this.check(id, false)
            }
        } else {
            await sleep(2000)
            this.check(id, true)
        }
    }
}