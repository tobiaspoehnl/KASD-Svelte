import Boom from "@hapi/boom";
import { db } from "../model/db.js";
import { validationError } from "./logger.js";
import { IdSpec, PlacemarkArraySpec, PlacemarkSpecReal, PlacemarkSpecPlus } from "../model/joi-schemas.js";
import {imageStore} from "../model/image-store.js";


export const placemarkApi = {
    find: {
        auth: {strategy: "jwt"},
        handler: async function (request, h) {
            try {
                const placemarks = await db.placemarkStore.getAllPlacemarks();
                return placemarks;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        response: { schema: PlacemarkArraySpec, failAction: validationError },
        description: "Get all placemarks",
        notes: "Returns all placemarks",
    },

    findOne: {
        auth: false,
        handler: async function (request, h) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (!placemark) {
                    return Boom.notFound("No placemark with this id");
                }
                return placemark;
            } catch (err) {
                return Boom.serverUnavailable("No placemark with this id");
            }
        },
        tags: ["api"],
        description: "Find a placemark",
        notes: "Returns a placemark",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: PlacemarkSpecPlus, failAction: validationError },
    },
    create: {
        auth: {strategy: "jwt"},
        handler: async function (request, h) {
            try {
                const userid = request.auth.credentials._id;
                const newPlacemark = await db.placemarkStore.addPlacemark(userid, request.payload);
                if (newPlacemark) {
                    return h.response(newPlacemark).code(200);
                }
                return Boom.badImplementation("error creating placemark");
            } catch (err) {
                return Boom.serverUnavailable("Database Error create");
            }
        },
        tags: ["api"],
        description: "Create a placemark",
        notes: "Returns the newly created placemark",
        validate: { payload: PlacemarkSpecPlus, failAction: validationError },
        response: { schema: PlacemarkSpecPlus, failAction: validationError },
    },

    deleteOne: {
        auth: {
            strategy: "jwt"
        },
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (!placemark) {
                    return Boom.notFound("No placemark with this id");
                }
                if(loggedInUser.adminrights || loggedInUser._id===placemark.createdby){
                    await db.placemarkStore.deletePlacemarkById(placemark._id);
                    return h.response().code(204);
                }
                return false
            } catch (err) {
                return Boom.serverUnavailable("No placemark with this id");
            }
        },
        tags: ["api"],
        description: "Delete a placemark",
        validate: { params: { id: IdSpec }, failAction: validationError },
    },

    deleteAll: {
        auth: {strategy: "jwt"},
        handler: async function (request, h) {
            try {
                await db.placemarkStore.deleteAllPlacemarks();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all placemarkApi",
    },
    getallimages: {
        auth: false,
        handler: async function (request, h) {
            try {
                const images = imageStore.getAllImages();
                return images;
            } catch (err) {
            return Boom.serverUnavailable("Database Error");
            }
        }
    },

    editPlacemark: {
        auth: false,
        handler: async function (request, h) {
            try {
                const updatedPlacemark = request.payload
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id)
                await db.placemarkStore.updatePlacemark(placemark, updatedPlacemark)
                return true;
            } catch (err) {
                return Boom.serverUnavailable("Database Error create");
            }
        },
    },


};