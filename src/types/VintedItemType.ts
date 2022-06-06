import VintedItemPhoto from "./VintedItemPhoto.js";
import VintedItemLocation from "./VintedItemLocation.js";
import VintedUserType from "./VintedUserType.js";

export default interface VintedItemType {
    id: number;
    title: string;
    price: string;
    currency: string;
    brand_title: string;
    is_for_swap: boolean;
    url: string;
    photo: VintedItemPhoto;
    favourite_count: number;
    service_fee: string | null;
    total_item_price: string;
    view_count: number;
    size: string | null;
    description: string | null;
    location: VintedItemLocation;
    user: VintedUserType | undefined;
}