import { Placemark } from "./placemark.js";
import {userStore} from "./user-store.js";
// eslint-disable-next-line import/no-cycle
import {db} from "../db.js";

export const placemarkStore = {

    async getAllPlacemarks() {
        const placemark = await Placemark.find().lean();
        return placemark;
    },

    async getPlacemarkById(id) {
        if (id) {
            const placemark = await Placemark.findOne({ _id: id }).lean();
            return placemark;
        }
        return null;
    },

    async addPlacemark(userid, placemark) {
        placemark.createdby=userid;
        const newPlacemark = new Placemark(placemark);
        const placemarkobj = await newPlacemark.save();
        return this.getPlacemarkById(placemarkobj._id);
    },

    async getUserPlacemarks(user) {
        const id = await userStore.getUserById()
        const placemark = await Placemark.find({ createdby: id }).lean();
        return placemark;
    },

    async deletePlacemarkById(id) {
        try {
            await Placemark.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllPlacemarks() {
        await Placemark.deleteMany({});
    },

    async updatePlacemark(placemark, updatedPlacemark) {
        const placemarkToUpdate = await Placemark.findOne({_id: placemark._id})
        placemarkToUpdate.name=updatedPlacemark.name
        placemarkToUpdate.description=updatedPlacemark.description
        placemarkToUpdate.location.longitude=updatedPlacemark.location.longitude
        placemarkToUpdate.location.latitude=updatedPlacemark.location.latitude
        placemarkToUpdate.category=updatedPlacemark.category

        await placemarkToUpdate.save();
    },
    async CountPlacemarks(){
        const placemarks = await Placemark.countDocuments();
        return placemarks;
    },

    async CountPlacemarksByCategory(category){
        const placemarks = await Placemark.countDocuments({ category: category});
        return placemarks
    },
    async imagePush(placemark, url){
        const placemark2 = await db.placemarkStore.getPlacemarkById(placemark._id);
        placemark2.image.push(url);
        await this.updatePlacemarkImage(placemark2);
    },
    async updatePlacemarkImage(updatedPlacemark) {
        const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
        placemark.title = updatedPlacemark.title;
        placemark.image = updatedPlacemark.image;
        await placemark.save();
    },
    async deletePlacemarkimgs(updatedPlacemark) {
        const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
        placemark.image = [];
        await placemark.save();
    },

};