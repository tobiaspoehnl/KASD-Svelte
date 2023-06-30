import { db } from "../model/db.js";


export const adminController = {
    index: {
        handler: async function (request, h) {
                const loggedInUser = request.auth.credentials;
                if (loggedInUser.adminrights){
                    const viewData = {
                        users: await db.userStore.getAllUsers(),
                    };
                    return h.view("admin-page", viewData);
                }
                const placemark = await db.placemarkStore.getAllPlacemarks();
                const viewData = {
                    placemark: placemark,
                };
                return h.view("placemarks-main", viewData)
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