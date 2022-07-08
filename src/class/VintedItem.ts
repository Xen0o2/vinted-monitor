import Query from "./Query.js";
import VintedUserType from "../types/VintedUserType.js";
import VintedItemType from "../types/VintedItemType.js";

export default class VintedItem {
    info: VintedItemType;
    user: VintedUserType | undefined;
    private initialized: boolean = false;

    constructor(data: any){
        this.info = data;
        return this;
    }

    async initialize(searchUrl: string) {
        if(this.initialized) return this.info;
        if(!this.info?.url) return undefined;
        const itemInfo = await new Query(this.info.url).send();
        if(itemInfo == "rateLimit") return "rateLimit";
        this.info = {...this.info, ...itemInfo, searchUrl: searchUrl.replace(".be",".fr"), date: this.info?.photo?.high_resolution?.timestamp ? new Date(this.info.photo.high_resolution.timestamp * 1000) : null};
        this.info.url = this.info.url.replace(".be",".fr");
        this.user = this.info.user;
        this.initialized = true;
        return this.info;
    }
}