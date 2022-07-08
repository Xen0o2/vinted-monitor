import List from "../class/List.js"
import VintedItemType from "./VintedItemType.js";

export default interface MonitorCache {
    subUrl: string;
    items: VintedItemType[];
    list: List | [];
}