import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";
import {db} from "./model/db.js";
import {apiRoutes} from "./api-routes.js";
import {accountsController} from "./controllers/accounts-controller.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

async function init() {
    const server = Hapi.server({
        port: 3000,
        host: "localhost",
    });
    await server.register(Vision);
    await server.register(Cookie);
    server.views({
        engines: {
            hbs: Handlebars,
        },
        relativeTo: dirname,
        path: "./pages",
        layoutPath: "./pages",
        partialsPath: "./pages/components",
        layout: true,
        isCached: false,
    });
    server.auth.strategy("session", "cookie", {
        cookie: {
            name: "placemark",
            password: "RivuZpno?123456789lkashjdkjsgdfkjhsdgfkjashgfksjdfgaskdjfgadsfg",
            isSecure: false,
        },
        redirectTo: "/",
        validate: accountsController.validate,
    });
    server.auth.default("session");
    db.init();
    server.route(webRoutes);
    server.route(apiRoutes);
    await server.start();
    console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();