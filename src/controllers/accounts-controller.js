//import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../model/db.js";

export const accountsController = {
    index: {
        handler: function (request, h) {
            return h.view("main", { title: "Welcome to Placemarks" });
        },
    },
    showSignup: {
        handler: function (request, h) {
            return h.view("signup-page", { title: "Sign up for Placemarks" });
        },
    },
    signup: {
        handler: async function (request, h) {
            const user = request.payload;
            console.log(user);
            await db.placemarkStore.addUser(user);
            return h.redirect("/");
        },
    },
    showLogin: {
        handler: function (request, h) {
            return h.view("login-page", { title: "Login to Placemark" });
        },
    },
    login: {
        handler: async function (request, h) {
            const { email, password } = request.payload;
            const user = await db.placemarkStore.getUserByEmail(email);
            if (!user || user.password !== password) {
                return h.redirect("/");
            }
            return h.redirect("/dashboard");
        },
    },
    logout: {
        handler: function (request, h) {
            request.cookieAuth.clear();
            return h.redirect("/");
        },
    },
};
