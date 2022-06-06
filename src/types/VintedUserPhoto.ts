export default interface VintedUserPhoto {
    id: number;
    width: number | null;
    height: number | null;
    url: string | null;
    dominant_color: string | null;
    dominant_color_opaque: string | null;
    full_size_url: string | null;
    is_hidden: boolean;
}