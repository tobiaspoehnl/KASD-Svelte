import { userApi } from "./api/user-api.js";
import { placemarkApi } from "./api/placemark-api.js";

export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

    { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
    { method: "POST", path: "/api/users/{id}/placemarks", config: placemarkApi.create },
    { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
    { method: "DELETE", path: "/api/placemarks/{id}/delete", config: placemarkApi.deleteOne },
    { method: "POST", path: "/api/placemarks/{id}/edit", config: placemarkApi.editPlacemark },
    { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },
    { method: "GET", path: "/api/images", config: placemarkApi.getallimages },
    { method: "POST", path: "/api/images/{id}/imageupload", config: placemarkApi.uploadImage },
    { method: "GET", path: "/api/images/{id}/imagedelete", config: placemarkApi.deleteImage },
    { method: "GET", path: "/api/dataset", config: placemarkApi.getdataset },

];