import Query from "./Query.js";
import VintedUserType from "../types/VintedUserType.js";
import VintedItemType from "../types/VintedItemType.js";

export default class VintedItem {
    info: VintedItemType;
    user: VintedUserType | undefined;
    initialized: boolean = false;

    constructor(data: any){
        this.info = data;
        return this;
    }

    async initialize() {
        if(this.initialized) return this.info;
        if(!this.info?.url) return undefined;
        const itemInfo = await new Query(this.info.url).send();
        if(itemInfo == "rateLimit") return "rateLimit";
        this.info = {...this.info, ...itemInfo};
        this.user = this.info.user;

        this.initialized = true;
        return this.info;
    }
}