import VintedUserPhoto from "./VintedUserPhoto.js";

export default interface VintedUserType {
    id: number;
    login: string;
    name: string | null;
    email: string | null;
    gender: string | null;
    item_count: number;
    given_item_count: number;
    taken_item_count: number;
    followers_count: number;
    following_count: number;
    positive_feedback_count: number;
    neutral_feedback_count: number;
    negative_feedback_count: number;
    created_at: Date;
    last_loged_on_ts: Date;
    city_id: number | null;
    city: string | null;
    country_id: string | null;
    country_code: string | null;
    country_iso_code: string | null;
    country_title_local: string | null;
    country_title: string | null;
    photo: VintedUserPhoto;
    moderator: boolean;
    allow_direct_messaging: boolean;
    total_items_count: number;
    profile_url: string;
    is_online: boolean;
}