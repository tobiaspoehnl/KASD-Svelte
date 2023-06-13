import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import {testPlacemark, testPlacemarks, maggie, maggieCredentials, testUsers} from "../fixtures.js";
import { EventEmitter } from "events";

const placemark = new Array(testPlacemark.length)

EventEmitter.setMaxListeners(27);

suite("Placemark API tests", () => {
    setup(async () => {
        await placemarkService.clearAuth();
        await placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggieCredentials);
        await placemarkService.deleteAllUsers();
        const user = await placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggieCredentials)
        await placemarkService.deleteAllPlacemarks();
        for (let i = 0; i < testPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            placemark[0] = await placemarkService.createPlacemark(user._id, testPlacemarks[i]);
        }
    });
    teardown(async () => {});

    test("create a placemark", async () => {
        const user = await placemarkService.createUser(maggie);
        const newPlacemark = await placemarkService.createPlacemark(user._id , testPlacemark);
        assertSubset(testPlacemark, newPlacemark);
        assert.isDefined(newPlacemark._id);
    });

    test("delete all placemarks", async () => {
        let returnedPlacemark = await placemarkService.getAllPlacemarks();
        assert.equal(returnedPlacemark.length, 4);
        await placemarkService.deleteAllPlacemarks()
        returnedPlacemark = await placemarkService.getAllPlacemarks();
        assert.equal(returnedPlacemark.length, 0);
    });
    test("get a placemark", async () => {
        const returnedplacemark = await placemarkService.getPlacemark(placemark[0]._id);
        assert.deepEqual(placemark[0], returnedplacemark);
    });

    test("get a placemark - bad id", async () => {
        try {
            const returnedplacemark = await placemarkService.getPlacemark("1234");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No placemark with this id");
            assert.equal(error.response.data.statusCode, 503);
        }
    });

    test("get a placemark - deleted placemark", async () => {
        await placemarkService.deleteAllPlacemarks();
        try {
            const returnedplacemark = await placemarkService.getPlacemark(placemark[0]._id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No placemark with this id");
            assert.equal(error.response.data.statusCode, 404);
        }
    });
});