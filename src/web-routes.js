import {placemarksMainController} from "./controllers/placemarks-main-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: placemarksMainController.index }
];