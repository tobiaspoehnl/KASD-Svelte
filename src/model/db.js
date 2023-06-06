import {userStore} from "./mongo/user-store.js";
import {placemarkStore} from "./mongo/placemark-store.js";
import {connectMongo} from "./mongo/connect.js";


export const db = {
        userStore: null,
        placemarkStore: null,

    init(){
        this.userStore = userStore;
        this.placemarkStore = placemarkStore
        connectMongo()
    }
}
