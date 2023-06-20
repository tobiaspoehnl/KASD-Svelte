import Mongoose from "mongoose";
import {User} from "./user.js";


const { Schema } = Mongoose;

const placemarkSchema = new Schema({
    name: String,
    description: String,
    category: String,
    location: {latitude: Number,
        longitude: Number},
    image: String,
    createdby: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});



export const Placemark = Mongoose.model("Placemark", placemarkSchema);