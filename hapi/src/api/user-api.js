import Boom from "@hapi/boom";
import { db } from "../model/db.js"
import { UserSpec, UserArray, IdSpec, UserSpecPlus, UserCredentialsSpec, JwtAuth } from "../model/joi-schemas.js";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";


export const userApi = {
    find: {
        auth: {strategy: "jwt"},
        handler: async function (request, h) {
            try {
                const users = await db.userStore.getAllUsers();
                return users;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Get all userApi",
        notes: "Returns details of all userApi",
        response: { schema: UserArray, failAction: validationError },
    },

    findOne: {
        auth: {strategy: "jwt"},
        handler: async function (request, h) {
            try {
                const user = await db.userStore.getUserById(request.params.id);
                if (!user) {
                    return Boom.notFound("No User with this id");
                }
                return user;
            } catch (err) {
                return Boom.serverUnavailable("No User with this id");
            }
        },
        tags: ["api"],
        description: "find one specific user",
        notes: "Returns details of one user",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: UserSpecPlus, failAction: validationError },
    },

    create: {
        auth: false,
        handler: async function (request, h) {
            try {
                const user = await db.userStore.addUser(request.payload);
                if (user) {
                    return h.response(user).code(201);
                }
                return Boom.badImplementation("error creating user");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a user",
        notes: "Returns a newly created user",
        validate: { payload: UserSpec, failAction: validationError },
        response: { schema: UserSpecPlus, failAction: validationError },
    },

    deleteAll: {
        auth: {strategy: "jwt"},
        handler: async function (request, h) {
            try {
                await db.userStore.deleteAllUsers();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all userApi",
        notes: "All userApi removed from Placemark",
    },
    authenticate: {
        auth: false,
        handler: async function (request, h) {
            try {
                const user = await db.userStore.getUserByEmail(request.payload.email);
                if (!user) {
                    return Boom.unauthorized("User not found");
                }
                if (user.password !== request.payload.password) {
                    return Boom.unauthorized("Invalid password");
                }
                if (!user.adminrights){
                    return Boom.unauthorized("Not an Admin");
                }
                const token = createToken(user);
                return h.response({success: true, token: token}).code(201)
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Authenticate  a User",
        notes: "If user has valid email/password, create and return a JWT token",
        validate: {payload: UserCredentialsSpec, failAction: validationError},
        response: {schema: JwtAuth, failAction: validationError},
    }
};
