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
    { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },
];