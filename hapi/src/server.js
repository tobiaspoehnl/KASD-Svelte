import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import Inert from "@hapi/inert";
import HapiSwagger from "hapi-swagger";
import Handlebars from "handlebars";
import path from "path";
import Joi from "joi";
import jwt from "hapi-auth-jwt2";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { webRoutes } from "./web-routes.js";
import {db} from "./model/db.js";
import { validate } from "./api/jwt-utils.js";
import {apiRoutes} from "./api-routes.js";
import {accountsController} from "./controllers/accounts-controller.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename)

const result = dotenv.config();
if (result.error) {
    console.log(result.error.message);
    process.exit(1);
}


const swaggerOptions = {
    info: {
        title: "Placemark API",
        version: "0.1",
    },
    securityDefinitions: {
        jwt: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
        },
    },
    security: [{ jwt: [] }],
};

async function init() {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        "routes": {
            "cors": true
        }

    })
    await server.register(Inert);
    await server.register(Vision);
    await server.register(Cookie);
    await server.register(jwt);
    await server.register([
        Inert,
        Vision,
        {
            plugin:HapiSwagger,
            options:swaggerOptions,

        },
    ]);

    server.validator(Joi);

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
    server.auth.strategy("jwt", "jwt", {
        key: process.env.cookie_password,
        validate: validate,
        verifyOptions: { algorithms: ["HS256"] },
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