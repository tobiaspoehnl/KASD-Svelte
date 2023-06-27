import { db } from "../model/db.js";
import { imageStore } from "../model/image-store.js";
import {PlacemarkSpec} from "../model/joi-schemas.js";

export const placemarkController = {
    index: {
        handler: async function (request, h) {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            const loggedInUser = request.auth.credentials
            const OwnerOrAdmin= (placemark.createdby.equals(loggedInUser._id || loggedInUser.adminrights));
            const viewData = {
                placemark: placemark,
                OwnerOrAdmin: OwnerOrAdmin
            };
            return h.view("placemark-page", viewData);
        },
    },
    uploadImage: {
        handler: async function (request, h) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                const file = request.payload.imagefile;
                if (Object.keys(file).length > 0) {
                    const url = await imageStore.uploadImage(request.payload.imagefile);
                    placemark.image.push(url);
                    await db.placemarkStore.updatePlacemark(placemark);
                }
                return h.redirect(`/placemark/${placemark._id}`);
            } catch (err) {
                console.log(err);
                return h.redirect(`/placemark/${placemark._id}`);
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },
    editPlacemark:{
        handler: async function (request, h) {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            const loggedInUser = request.auth.credentials;
            if (!placemark.createdby.equals(loggedInUser._id) && !loggedInUser.adminrights) {
                console.log("not authorized to Edit the Placemark");
                return h.redirect(`/placemark/${request.params.id}`);
            }
            const updatedPlacemark = {
                name: request.payload.name,
                description: request.payload.description,
                location: {
                    latitude: request.payload.latitude,
                    longitude: request.payload.longitude
                },
                category: request.payload.category,
            };
            await db.placemarkStore.updatePlacemark(placemark, updatedPlacemark);
            return h.redirect(`/placemark/${request.params.id}`);
        },

    }
};