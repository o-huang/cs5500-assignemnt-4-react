import { act, create } from 'react-test-renderer';
import TuitStats from "../components/tuits/tuit-stats";

test('stats render correctly for dislike', () => {
    let stats = {
        likes: 123,
        replies: 234,
        retuits: 345
    }

    const dislikeTuit = () => {
        act(() => {
            stats.likes--;
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
                likeTuit={dislikeTuit}
                tuit={{ stats: stats }} />
        );
    })

    const root = tuitStats.root;
    const likesCounter = root.findByProps({ className: 'ttr-stats-likes' })
    const retuitsCounter = root.findByProps({ className: 'ttr-stats-retuits' })
    const repliesCounter = root.findByProps({ className: 'ttr-stats-replies' })
    const dislikeTuitButton = root.findByProps({ className: 'ttr-dislike-tuit-click' })

    let likesText = likesCounter.children[0];
    const repliesText = repliesCounter.children[0];
    const retuitsText = retuitsCounter.children[0];
    expect(likesText).toBe('123');
    expect(repliesText).toBe('234');
    expect(retuitsText).toBe('345');

    //Disliking a tuit and seeing that counter goes down
    act(() => { dislikeTuitButton.props.onClick() })
    likesText = likesCounter.children[0];
    expect(likesText).toBe('123');

});