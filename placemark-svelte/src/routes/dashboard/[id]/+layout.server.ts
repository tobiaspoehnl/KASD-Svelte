// @ts-nocheck
import {placemarkService} from "../../../services/placemark-service.ts";
export const load = async ({ params }) => {
    const success = await placemarkService.getPlacemark(params.id);
    return {
        placemark: success
    }
}