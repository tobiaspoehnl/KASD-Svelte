import { PlacemarkSpec } from "../model/joi-schemas.js";
import {db} from "../model/db.js";

export const placemarksMainController = {
    dashboard: {
        handler: async function (request, h) {
            const placemark = await db.placemarkStore.getAllPlacemarks();
            const viewData = {
                placemark: placemark,
            };
            return h.view("placemarks-main", viewData);
        },
    },
    addPlacemark: {
        validate: {
            payload: PlacemarkSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("placemarks-main", { title: "Add Placemark error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const newPlacemark = {
                name: request.payload.name,
                description: request.payload.description,
                category: request.payload.category,
                location: {latitude: request.payload.latitude,
                    longitude: request.payload.longitude,},
            };
            console.log(newPlacemark)
            await db.placemarkStore.addPlacemark(loggedInUser._id, newPlacemark);
            return h.redirect("/dashboard");
        },
    },

    deletePlacemark: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            const creator = placemark.createdby
            console.log(creator)
            if(loggedInUser.adminrights || loggedInUser._id===creator){
                await db.placemarkStore.deletePlacemarkById(placemark._id);
                return h.redirect("/dashboard");
            }
            return h.redirect("/dashboard");
        },
    },
};