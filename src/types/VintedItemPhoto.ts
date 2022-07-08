import VintedItemPhotoHighResolution from "./VintedItemPhotoHighResolution";

export default interface VintedItemPhoto {
    id: number;
    width: number | null;
    height: number | null;
    dominant_color: string | null;
    dominant_color_opaque: string | null;
    url: string | null;
    full_size_url: string | null;
    high_resolution: VintedItemPhotoHighResolution | null;
}
