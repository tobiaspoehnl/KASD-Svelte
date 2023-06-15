import { assert } from "chai";
import { db } from "../../src/model/db.js";
import { testPlacemark, maggie, testPlacemarks } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";


suite("placemark Model tests", () => {

    setup(async () => {
        db.init();
        const user = await db.userStore.addUser(maggie);
        await db.placemarkStore.deleteAllPlacemarks();
        for (let i = 0; i < testPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testPlacemarks[i] = await db.placemarkStore.addPlacemark(user._id,testPlacemarks[i]);
        }
    });

    test("create a placemark", async () => {
        const user = await db.userStore.addUser(maggie);
        const newPlacemark = await db.placemarkStore.addPlacemark(user._id,testPlacemark);
        assertSubset(testPlacemark, newPlacemark);
    });

    test("delete all placemarkApi", async () => {
        await db.placemarkStore.deleteAllPlacemarks();
        const returnedPlacemark = await db.placemarkStore.getAllPlacemarks();
        assert.equal(returnedPlacemark.length, 0);
    });

    test("get a placemark - success", async () => {
        const user = await db.userStore.addUser(maggie);
        const placemark = await db.placemarkStore.addPlacemark(user._id,testPlacemark);
        const returnedPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
        assert.deepEqual(placemark, returnedPlacemark);

    });

    test("delete One placemark - success", async () => {
        await db.placemarkStore.deletePlacemarkById(testPlacemarks[0]._id);
        const returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, testPlacemarks.length - 1);
        const deletedPlacemark = await db.placemarkStore.getPlacemarkById(testPlacemarks[0]._id);
        assert.isNull(deletedPlacemark);
    });

    test("get a placemark - bad params", async () => {
        assert.isNull(await db.placemarkStore.getPlacemarkById(""));
        assert.isNull(await db.placemarkStore.getPlacemarkById());
    });

    test("delete One placemark - fail", async () => {
        await db.placemarkStore.deletePlacemarkById("bad-id");
        const allPlacemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(testPlacemarks.length, allPlacemarks.length);
    });
});
