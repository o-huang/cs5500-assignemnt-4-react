/**
 * @jest-environment node
 */
import {
    findAllTuitsDislikedByUser, findAllUsersThatDisikedTuit,
    userDislikesTuit, checkIfUserDislikedTuit
} from "../services/dislike-service"
import { createUser, deleteUsersByUsername, findAllUsers, findUserById } from "../services/users-service";
import {
    findAllTuits, findTuitById, findTuitByUser, createTuit, updateTuit, deleteTuit, deleteTuitsByTuit
} from "../services/tuits-service";

import {
    login, register, logout, profile
} from "../services/security-service";

describe('userDislikesTuit', () => {
    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    // sample tuit to insert and disliked
    const theTuit = {
        tuit: "dislike tuit test"
    };

    // setup test before running test
    beforeAll(() => {
    })

    // clean up after test runs
    afterAll(async () => {

        deleteUsersByUsername(ripley.username);
        deleteTuitsByTuit(theTuit.tuit);
    });

    test('dislike tuit test', async () => {
        // register a new user to database
        const newUser = await register(ripley)

        // create a new tuit
        const newTuit = await createTuit(newUser._id, theTuit)

        // make user dislike tuit and check status to ok making sure it fulfilled
        const newDislike = await userDislikesTuit(newUser._id, newTuit._id)
        expect(newDislike).toEqual("OK")

        // we now check if user actually disliked tuit
        const checkIfDisliked = await checkIfUserDislikedTuit(newUser._id, newTuit._id)
        expect(checkIfDisliked).toEqual({ status: 'disliked' })

        // User now undislikes the tuit(aka remove dislike)
        const newDislike2 = await userDislikesTuit(newUser._id, newTuit._id)
        expect(newDislike2).toEqual("OK")

        // Check that user dislike the tuit and return proper result.
        const checkIfDislikedRemoved = await checkIfUserDislikedTuit(newUser._id, newTuit._id)
        expect(checkIfDislikedRemoved).toEqual({ status: 'nothing' })
    });
});

describe('findAllTuitDislikeByUser', () => {
    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    // sample tuit to insert and disliked
    const tuit1 = {
        tuit: "dislike tuit test 1"
    };

    const tuit2 = {
        tuit: "dislike tuit test 2"
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

    test('find all tuit disliked by user', async () => {
        // register a new user to database
        const newUser = await register(ripley)

        // create a new tuit 1
        const newTuit1 = await createTuit(newUser._id, tuit1)
        // make user dislike tuit 1
        await userDislikesTuit(newUser._id, newTuit1._id)

        // create a new tuit 2
        const newTuit2 = await createTuit(newUser._id, tuit2)
        // make user dislike tuit 2
        await userDislikesTuit(newUser._id, newTuit2._id)


        //Test all the tuit user dislikes and if they are correct
        const allDislikedTuit = await findAllTuitsDislikedByUser(newUser._id)

        expect(allDislikedTuit[0]["tuit"]).toEqual("dislike tuit test 1")
        expect(allDislikedTuit[1]["tuit"]).toEqual("dislike tuit test 2")


        // User now undislikes the tuits(aka remove dislike)
        await userDislikesTuit(newUser._id, newTuit1._id)
        await userDislikesTuit(newUser._id, newTuit2._id)

    });
});

describe(' findAllUsersThatDisikedTuit', () => {
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
    // sample tuit to insert and disliked
    const tuit1 = {
        tuit: "dislike tuit test 1"
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

    test('find all user who disliked tuit', async () => {
        // register a new user to database
        const newUser = await register(ripley)
        const newUser2 = await register(jake)

        // create a new tuit 1
        const newTuit1 = await createTuit(newUser._id, tuit1)
        // make users dislike tuit
        await userDislikesTuit(newUser._id, newTuit1._id)
        await userDislikesTuit(newUser2._id, newTuit1._id)

        //Test find all user who disliked tuit
        const allUserWhoDislikedTuit = await findAllUsersThatDisikedTuit(newTuit1._id)
        expect(allUserWhoDislikedTuit[0]["dislikedBy"]["username"]).toEqual("ellenripley")
        expect(allUserWhoDislikedTuit[1]["dislikedBy"]["username"]).toEqual("jakeripley")

        // User now undislikes the tuits(aka remove dislike)
        await userDislikesTuit(newUser._id, newTuit1._id)
        await userDislikesTuit(newUser2._id, newTuit1._id)

    });
});