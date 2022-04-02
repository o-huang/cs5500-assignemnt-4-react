/**
 * @jest-environment node
 */

import {
    findAllTuitsLikedByUser, findAllUsersThatLikedTuit,
    userLikesTuit, checkIfUserLikedTuit
} from "../services/likes-service"

import { createUser, deleteUsersByUsername, findAllUsers, findUserById } from "../services/users-service";
import {
    findAllTuits, findTuitById, findTuitByUser, createTuit, updateTuit, deleteTuit, deleteTuitsByTuit
} from "../services/tuits-service";

import {
    login, register, logout, profile
} from "../services/security-service";
import {findAllUsersThatDisikedTuit, userDislikesTuit} from "../services/dislike-service";


describe('userLikesTuit', () => {
    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    // sample tuit to insert and liked
    const theTuit = {
        tuit: "like tuit test"
    };

    // setup test before running test
    beforeAll(() => {
    })

    // clean up after test runs
    afterAll(async () => {

        deleteUsersByUsername(ripley.username);
        deleteTuitsByTuit(theTuit.tuit);
    });

    test('like tuit test', async () => {
        // register a new user to database
        const newUser = await register(ripley)

        // create a new tuit
        const newTuit = await createTuit(newUser._id, theTuit)

        // make user like tuit and check status to ok making sure it fulfilled
        const newLike = await userLikesTuit(newUser._id, newTuit._id)
        expect(newLike).toEqual("OK")

        // we now check if user actually liked tuit
        const checkIfLiked = await checkIfUserLikedTuit(newUser._id, newTuit._id)
        expect(checkIfLiked).toEqual({ status: 'liked' })

        // User now likes the tuit(aka remove like)
        const newLike2 = await userLikesTuit(newUser._id, newTuit._id)
        expect(newLike2).toEqual("OK")

        // Check that user like the tuit and return proper result.
        const checkIfLikedRemoved = await checkIfUserLikedTuit(newUser._id, newTuit._id)
        expect(checkIfLikedRemoved).toEqual({ status: 'nothing' })
    });
});

describe('findAllTuitLikeByUser', () => {
    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    // sample tuit to insert and Liked
    const tuit1 = {
        tuit: "like tuit test 1"
    };

    const tuit2 = {
        tuit: "like tuit test 2"
    };

    // setup test before running test
    beforeAll(() => {
    })

    // clean up after test runs
    afterAll(async () => {

        deleteUsersByUsername(ripley.username);
        deleteTuitsByTuit(tuit1.tuit);
        deleteTuitsByTuit(tuit2.tuit);
    });

    test('find all tuit Liked by user', async () => {
        // register a new user to database
        const newUser = await register(ripley)

        // create a new tuit 1
        const newTuit1 = await createTuit(newUser._id, tuit1)
        // make user like tuit 1
        await userLikesTuit(newUser._id, newTuit1._id)

        // create a new tuit 2
        const newTuit2 = await createTuit(newUser._id, tuit2)
        // make user like tuit 2
        await userLikesTuit(newUser._id, newTuit2._id)


        //Test all the tuit user likes and if they are correct
        const allLikedTuit = await findAllTuitsLikedByUser(newUser._id)

        expect(allLikedTuit[0]["tuit"]).toEqual("like tuit test 1")
        expect(allLikedTuit[1]["tuit"]).toEqual("like tuit test 2")


        // User now unlikes the tuits(aka remove like)
        await userLikesTuit(newUser._id, newTuit1._id)
        await userLikesTuit(newUser._id, newTuit2._id)

    });
});

describe(' findAllUsersThatLikedTuit', () => {
    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const jake = {
        username: 'jakeripley',
        password: 'lv426',
        email: 'jakeripley@aliens.com'
    };
    // sample tuit to insert and liked
    const tuit1 = {
        tuit: "like tuit test 1"
    };

    // setup test before running test
    beforeAll(() => {
    })

    // clean up after test runs
    afterAll(async () => {

        deleteUsersByUsername(ripley.username);
        deleteUsersByUsername(jake.username);
        deleteTuitsByTuit(tuit1.tuit);
    });

    test('find all user who liked tuit', async () => {
        // register a new user to database
        const newUser = await register(ripley)
        const newUser2 = await register(jake)

        // create a new tuit 1
        const newTuit1 = await createTuit(newUser._id, tuit1)
        // make users like tuit
        await userLikesTuit(newUser._id, newTuit1._id)
        await userLikesTuit(newUser2._id, newTuit1._id)

        //Test find all user who liked tuit
        const allUserWhoLikedTuit = await findAllUsersThatLikedTuit(newTuit1._id)
        expect(allUserWhoLikedTuit[0]["likedBy"]["username"]).toEqual("ellenripley")
        expect(allUserWhoLikedTuit[1]["likedBy"]["username"]).toEqual("jakeripley")

        // User now unlikes the tuits(aka remove like)
        await userLikesTuit(newUser._id, newTuit1._id)
        await userLikesTuit(newUser2._id, newTuit1._id)

    });
});