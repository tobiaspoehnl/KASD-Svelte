import axios from "axios";
import { latestPlacemark, user } from "../stores.ts";
import type {Placemark, PlacemarkNoImage, ReturnedPlacemark} from "./types";


export const placemarkService = {
    baseUrl: "https://placemark-hapi-tobias-poehnl.onrender.com",

    async login(email: string, password:string): Promise<boolean> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            if (response.data.success) {
                user.set({
                    email: email,
                    token: response.data.token,
                    id: response.data.id
                });
                localStorage.user = JSON.stringify({ email: email, token: response.data.token, id: response.data.id });
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },


    async logout() {
        user.set({
            email: "",
            token: "",
            id : "",
        });
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("donation");
    },


    async signup(firstName: string, lastName: string, email: string, password: string, adminrights: boolean): Promise<boolean> {
        try {
            const userDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                adminrights: adminrights
            };
            console.log(userDetails)
            await axios.post(this.baseUrl + "/api/user", userDetails);
            return true;
        } catch (error) {
            return false;
        }
    },

    reload() {
        const localUser = localStorage.user;
        if (localUser) {
            const savedUser = JSON.parse(localUser);
            user.set({
                email: savedUser.email,
                token: savedUser.token,
                id: savedUser.id,
            });
            axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
        }
    },

    async getPlacemarks(): Promise<Array<ReturnedPlacemark>>{
        try {
            const response = await axios.get(this.baseUrl + "/api/placemarks");
            return response.data;
        } catch (error) {
            return [];
        }
    },

    async addPlacemark(placemark: Placemark, id: string): Promise<boolean> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/${id}/placemarks`, placemark);
            latestPlacemark.set(response.data);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    },

    async deletePlacemark(id: string): Promise<boolean>{
        try {
            const response = await axios.delete(`${this.baseUrl}/api/placemarks/${id}/delete`);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    },

    async editPlacemark(placemark: PlacemarkNoImage, id: string): Promise<boolean>{
        try {
            const updatedplacemark = placemark
            const response = await axios.post(`${this.baseUrl}/api/placemarks/${id}/edit`, updatedplacemark);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    },

    async getPlacemark(id: string): Promise<ReturnedPlacemark>{
        try{
            const response = await axios.get(`${this.baseUrl}/api/placemarks/${id}`);
            return response.data;
        } catch(error){
            return [];
        }
    },
    async getdataset(): Promise<object> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/dataset`);
            return response.data;
        } catch (error) {
            return [];
        }
    },

    async getallimages(): Promise<object[]>{
        try{
            const response = await axios.get(`${this.baseUrl}/api/images`);
            return response.data;
        } catch(error){
            return [];
        }
    },
    async uploadImage(id: string, files: File[]): Promise<boolean> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/images/${id}/imageupload`, files);
            return response.data;
        } catch (error) {
            return false;
        }
    },
    async deleteImages(id: string): Promise<boolean> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/images/${id}/imagedelete`,);
            return response.data;
        } catch (error) {
            return false;
        }
    }
};
