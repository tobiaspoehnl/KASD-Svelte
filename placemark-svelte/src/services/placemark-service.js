// @ts-nocheck
import axios from "axios";
import { latestPlacemark, user } from "../stores.js";


export const placemarkService = {
    baseUrl: "http://localhost:3000",

    async login(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            if (response.data.success) {
                user.set({
                    email: email,
                    token: response.data.token,
                    id: response.data.id
                });
                localStorage.donation = JSON.stringify({ email: email, token: response.data.token, id: response.data.id });
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


    async signup(userName, firstName, lastName, email, password, adminrights) {
        try {
            const userDetails = {
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                adminrights: adminrights
            };
            await axios.post(this.baseUrl + "/api/users", userDetails);
            return true;
        } catch (error) {
            return false;
        }
    },

    reload() {
        const donationCredentials = localStorage.donation;
        if (donationCredentials) {
            const savedUser = JSON.parse(donationCredentials);
            user.set({
                email: savedUser.email,
                token: savedUser.token,
                id: savedUser.id,
            });
            axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
        }
    },

    async getPlacemarks() {
        try {
            const response = await axios.get(this.baseUrl + "/api/placemarks");
            return response.data;
        } catch (error) {
            return [];
        }
    },

    async addPlacemark(placemark, id) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/${id}/placemarks`, placemark);
            latestPlacemark.set(placemark);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    },

    async deletePlacemark(data){
        try {
            const id = data.placemark._id
            const response = await axios.delete(`${this.baseUrl}/api/placemarks/${id}/delte`, id);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    },

    async editPlacemark(placemark, data){
        try {
            const id = data.placemark._id
            const updatedplacemark = placemark
            console.log(updatedplacemark)
            const response = await axios.post(`${this.baseUrl}/api/placemarks/${id}/edit`, updatedplacemark);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    },

    async getPlacemark(id){
        try{
            const response = await axios.get(`${this.baseUrl}/api/placemarks/${id}`);
            return response.data;
        } catch(error){
            return [];
        }
    },
    async getdataset() {
        try {
            const response = await axios.get(`${this.baseUrl}/api/dataset`);
            return response.data;
        } catch (error) {
            return [];
        }
    },

    async getallimages(){
        try{
            const response = await axios.get(`${this.baseUrl}/api/images`);
            return response.data;
        } catch(error){
            return [];
        }
    },
    async uploadImage(id, files) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/images/${id}/imageupload`, files);
            return response.data;
        } catch (error) {
            return [];
        }
    },
    async deleteImages(id) {
        try {
            const response = await axios.get(`${this.baseUrl}/api/images/${id}/imagedelete`,);
            return response.data;
        } catch (error) {
            return [];
        }
    }
};
