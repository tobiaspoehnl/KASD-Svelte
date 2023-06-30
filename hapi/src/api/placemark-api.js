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
                if(loggedInUser.adminrights || loggedInUser._id.equals(placemark.createdby)){
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
    getdataset: {
        auth: false,
        handler: async function (request, h) {
            try {
                const userlength = await db.userStore.CountUsers();
                const placemarklength = await db.placemarkStore.CountPlacemarks();
                const foodlength = await db.placemarkStore.CountPlacemarksByCategory("Food");
                const entertainmentlength = await db.placemarkStore.CountPlacemarksByCategory("Entertainment");
                const accommodationlength = await db.placemarkStore.CountPlacemarksByCategory("Accommodation");
                const transportationlength = await db.placemarkStore.CountPlacemarksByCategory("Transportation");
                const citylength = await db.placemarkStore.CountPlacemarksByCategory("City");
                const educationlength = await db.placemarkStore.CountPlacemarksByCategory("Education");
                const medicallength = await db.placemarkStore.CountPlacemarksByCategory("Medical");
                const sportlength = await db.placemarkStore.CountPlacemarksByCategory("Sport");
                const shoppinglength = await db.placemarkStore.CountPlacemarksByCategory("Shopping");
                const landscapefeaturelength = await db.placemarkStore.CountPlacemarksByCategory("Landscape-Feature");
                const riverlength = await db.placemarkStore.CountPlacemarksByCategory("River");
                const waterslength = await db.placemarkStore.CountPlacemarksByCategory("Waters");
                const bridgelength = await db.placemarkStore.CountPlacemarksByCategory("Bridge");
                const forestlength = await db.placemarkStore.CountPlacemarksByCategory("Forest");
                const parkslength = await db.placemarkStore.CountPlacemarksByCategory("Parks");
                const historicsiteslength = await db.placemarkStore.CountPlacemarksByCategory("Historic-sites");
                const gasstationlength = await db.placemarkStore.CountPlacemarksByCategory("Gas-station");
                const companylength = await db.placemarkStore.CountPlacemarksByCategory("Company");
                const otherslength = await db.placemarkStore.CountPlacemarksByCategory("Others");
                const viewData = {
                    title: "Analytics",
                    userlength: userlength,
                    placemarklength: placemarklength,
                    foodlength: foodlength,
                    entertainmentlength: entertainmentlength,
                    accommodationlength: accommodationlength,
                    transportationlength: transportationlength,
                    citylength: citylength,
                    educationlength: educationlength,
                    medicallength: medicallength,
                    sportlength: sportlength,
                    shoppinglength: shoppinglength,
                    landscapefeaturelength: landscapefeaturelength,
                    riverlength: riverlength,
                    waterslength: waterslength,
                    bridgelength: bridgelength,
                    forestlength: forestlength,
                    parkslength: parkslength,
                    historicsiteslength: historicsiteslength,
                    gasstationlength: gasstationlength,
                    companylength: companylength,
                    otherslength: otherslength,
                }
                return viewData;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        }
    },
    uploadImage: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                const file = Object.values(request.payload)[0];
                if (placemark.createdby.equals(loggedInUser._id) || loggedInUser.adminrights) {
                    if (Object.keys(file).length > 0) {
                        const url = await imageStore.uploadImage(file);
                        await db.placemarkStore.imagePush(placemark, url);
                        return true;
                    }
                }
                return false;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },
    deleteImage: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (loggedInUser.adminrights || placemark.createdby.equals(loggedInUser._id)) {
                    for (const element of placemark.image) {
                        await imageStore.deleteImage(element);
                    }
                    await db.placemarkStore.deletePlacemarkimgs(placemark);
                    return true
                }
                return false;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
    },
};