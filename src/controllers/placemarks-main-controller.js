import {db} from "../model/db.js";

export const placemarksMainController = {
    dashboard: {
        handler: async function (request, h) {
            const placemarks = await db.placemarkStore.getAllPlacemarks();
            const viewData = {
                title: "Placemark Dashboard",
                placemarks: placemarks,
            };
            return h.view("placemarks-main");
        },
    },
};
