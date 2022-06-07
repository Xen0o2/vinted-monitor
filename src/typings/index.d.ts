declare module "VintedMonitor";
import VintedItem from "../class/VintedItem.js"

export class VintedMonitor {
    /**
     * 
     * @param url The url to monitor
     */
    watch(url: string): VintedMonitor;

    /**
     * 
     * @param callback The function to run when a new item is detected, with as first argument, the item
     */
    onItemFound(callback: (item: VintedItem) => void): void;
}