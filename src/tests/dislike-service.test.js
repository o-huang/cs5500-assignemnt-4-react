/**
 * @jest-environment node
 */
import {
    findAllTuitsDislikedByUser,findAllUsersThatDisikedTuit,
    userDislikesTuit,checkIfUserDislikedTuit
} from "../services/dislike-service"
import {createUser, deleteUsersByUsername, findAllUsers, findUserById} from "../services/users-service";
import {
    findAllTuits, findTuitById, findTuitByUser, createTuit, updateTuit, deleteTuit, deleteTuitsByTuit
} from "../services/tuits-service";

import{
    login, register,logout,profile
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

    test('can insert new users with REST API', async () => {
        // register a new user to database
        const newUser  = await register(ripley)

        // create a new tuit
        const newTuit = await createTuit(newUser._id, theTuit)
        // make user dislike tuit and check status to ok making sure it fulfilled
        const newDislike = await userDislikesTuit(newUser._id,newTuit._id)
        expect(newDislike).toEqual("OK")
        // we now check if user actually disliked tuit
        const checkIfDisliked = await checkIfUserDislikedTuit(newUser._id,newTuit._id)
        expect(checkIfDisliked).toEqual({ status: 'disliked' })
        // User now undislikes the tuit(aka remove dislike)
        const newDislike2 = await userDislikesTuit(newUser._id,newTuit._id)
        expect(newDislike2).toEqual("OK")
        // Check that user dislike the tuit and return proper result.
        const checkIfDislikedRemoved = await checkIfUserDislikedTuit(newUser._id,newTuit._id)
        expect(checkIfDislikedRemoved).toEqual({ status: 'nothing' })
    });
});