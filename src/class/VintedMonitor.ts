import MonitorCache from "../types/MonitorCache.js";
import List from "./List.js";
import VintedItem from "./VintedItem.js";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export default class VintedMonitor {
    private cache: MonitorCache[] = [];
    private vintedEvent: ((item: VintedItem) => void) | undefined;

    // Example : https://www.vinted.be/vetements?search_text=casquette&brand_id[]=362&order=newest_first&color_id[]=12
    watch(url: string){
        if(url.match(/https:\/\/www\.vinted\.\w{2}\/vetements\?/g) == null) throw "Invalid URL";
        this.cache.push({subUrl:url.replace(".fr",".be"),items:[], list:[]});
        this.check(this.cache.length - 1, true);
        return this;
    }

    unWatch(url: string){
        let removed = false;
        if(this.cache.find(e => e.subUrl == url.replace(".fr",".be"))) this.cache.splice(this.cache.findIndex(e => e.subUrl == url),1), removed = true;
        return removed;
    }

    onItemFound(callback: (item: VintedItem) => void){
        this.vintedEvent = callback;
    }

    private async check(id: number, request: boolean){
        const url = this.cache[id]?.subUrl;
        if(!url) return
        if(request) this.cache[id].list = await new List(url).initialize();

        const newItem = new VintedItem(Object.values(this.cache[id].list).find((item: any) => !this.cache[id].items.find((e: any) => e.id == item.id)));
        const finishedItem = await newItem.initialize(url);
        if(!this.cache[id]) return
        if(finishedItem){
            if(finishedItem == "rateLimit"){
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