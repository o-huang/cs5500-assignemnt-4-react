import { act, create } from 'react-test-renderer';
import TuitStats from "../components/tuits/tuit-stats";
import {deleteUsersByUsername} from "../services/users-service";
import {createTuit, deleteTuitsByTuit} from "../services/tuits-service";
import {register} from "../services/security-service";
import {findAllTuitsDislikedByUser, userDislikesTuit} from "../services/dislike-service";

test('stats render correctly for like', () => {
    let stats = {
        likes: 123,
        replies: 234,
        retuits: 345
    }

    const likeTuit = () => {
        act(() => {
            stats.likes++;
            tuitStats.update(
                <TuitStats
                    tuit={{ stats: stats }}
                    likeTuit={() => { }}
                />)
        })
    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                likeTuit={likeTuit}
                tuit={{ stats: stats }} />
        );
    })

    const root = tuitStats.root;
    const likesCounter = root.findByProps({ className: 'ttr-stats-likes' })
    const retuitsCounter = root.findByProps({ className: 'ttr-stats-retuits' })
    const repliesCounter = root.findByProps({ className: 'ttr-stats-replies' })
    const likeTuitButton = root.findByProps({ className: 'ttr-like-tuit-click' })

    let likesText = likesCounter.children[0];
    const repliesText = repliesCounter.children[0];
    const retuitsText = retuitsCounter.children[0];
    expect(likesText).toBe('123');
    expect(repliesText).toBe('234');
    expect(retuitsText).toBe('345');


    //Liking tuit and seeing the counter
    act(() => { likeTuitButton.props.onClick() })
    likesText = likesCounter.children[0];
    expect(likesText).toBe('124');
});

