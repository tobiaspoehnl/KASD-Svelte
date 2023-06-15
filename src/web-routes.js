import {placemarksMainController} from "./controllers/placemarks-main-controller.js";
import {accountsController} from "./controllers/accounts-controller.js";
import {placemarkController} from "./controllers/placemark-controller.js";

export const webRoutes = [
    {   method: "GET", path: "/", config: accountsController.index},

    {method: "GET", path: "/login", config: accountsController.showLogin},
    {method: "GET", path: "/signup", config: accountsController.showSignup},
    {method: "GET", path: "/logout", config: accountsController.logout},
    {method: "POST", path: "/register", config: accountsController.signup},
    {method: "POST", path: "/authenticate", config: accountsController.login},
    {method: "GET", path: "/dashboard", config: placemarksMainController.dashboard},
    { method: "POST", path: "/dashboard/addplacemark", config: placemarksMainController.addPlacemark },
    { method: "GET", path: "/dashboard/deleteplacemark/{id}", config: placemarksMainController.deletePlacemark },
    {method: "GET", path: "/placemark/{id}", config: placemarkController.index },
    { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
    { method: "POST", path: "/placemark/{id}/uploadimage", config: placemarkController.uploadImage },



];