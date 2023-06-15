import { db } from "../model/db.js";


export const adminController = {
    index: {
        handler: async function (request, h) {
                const viewData = {
                    users: await db.userStore.getAllUsers(),
                };
                return h.view("admin-page", viewData);
        },
    },
    deleteUser: {
        handler: async function (request, h) {

            console.log(request.params.id)

            await db.userStore.deleteUserById(request.params.id)

            const viewData = {
                users: await db.userStore.getAllUsers(),
            };
            return h.view("admin-page", viewData);
        },
    },
};