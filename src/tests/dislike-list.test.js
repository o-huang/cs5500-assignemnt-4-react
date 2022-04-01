import Tuits from "../components/tuits";
import MyLikes from "../components/profile/my-likes";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import {findAllUsers} from "../services/users-service";
import {UserList} from "../components/profile/user-list";

const MOCKED_USERS = [
    {username: 'alice', password: 'alice123', email: 'repley@weyland.com', _id: "123"},
    {username: 'bob', password: 'bob123', email: 'sarah@bigjeff.com', _id: "234"},
    {username: 'charlie', password: 'charlie123', email: 'sarah@bigjeff.com', _id: "234"}
]

const MOCKED_TUITS = [
    {tuit:"alice's tuit", postedBy: MOCKED_USERS[0],_id:"123"},
    {tuit:"bob's tuit", postedBy: MOCKED_USERS[1],_id:"456"},
    {tuit:"charlie's tuit", postedBy: MOCKED_USERS[2],_id:"789" }
];

// test('tuit list renders static tuit array', () => {
//
//     render(
//         <HashRouter>
//             <MyLikes/>
//         </HashRouter>)
//     console.log(screen)
//     const theUser = screen.getByText(/alice@alice/i);
//     // expect(theUser).toBeInTheDocument();
//     // const linkElement = screen.getByText(/alice's tuit/i);
//     // expect(linkElement).toBeInTheDocument();
//
//
// });