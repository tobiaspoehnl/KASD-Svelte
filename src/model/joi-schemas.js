import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
    .keys({
        email: Joi.string().email().example("homer@simpson.com").required(),
        password: Joi.string().example("secret").required(),
    })
    .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
    adminrights: Joi.boolean().example("true").required(),
    username: Joi.string().example("hi123"),
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray")


export const PlacemarkSpec = Joi.object()
    .keys({
        name: Joi.string().required().example("Allianz Arena"),
        description: Joi.string().required().example("The Stadium of FC Bayern Munich"),
        category: Joi.string().required().example("1.Bundesliga"),
        latitude: Joi.number().required().min(-90).max(90).example(48.218791),
        longitude: Joi.number().required().min(-180).max(180).example(11.624695),
        image: Joi.string().allow("").optional().example(""),
        createdby: IdSpec,
    })
    .label("PlacemarkPayload");

export const PlacemarkSpecReal = Joi.object()
    .keys({
        name: Joi.string().required().example("Allianz Arena"),
        description: Joi.string().required().example("The Stadium of FC Bayern Munich"),
        category: Joi.string().required().example("1.Bundesliga"),
        location: {
            latitude: Joi.number().min(-90).max(90).example(48.218791),
            longitude: Joi.number().min(-180).max(180).example(11.624695),
        },
        image: Joi.string().allow("").optional().example(""),
        createdby: IdSpec,
    })
    .label("PlacemarkReal")


export const PlacemarkSpecPlus = PlacemarkSpecReal.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");


export const JwtAuth = Joi.object()
    .keys({
        success: Joi.boolean().example("true").required(),
        token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
    })
    .label("JwtAuth");

