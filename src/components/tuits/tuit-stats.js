import React from "react";
import * as likesService from "../../services/likes-service";
import * as dislikesService from "../../services/dislike-service";
import { useEffect, useState } from "react";

const TuitStats = ({ tuit, likeTuit = () => { }, dislikeTuit = () => { } }) => {


    const [tuitLikedStatus, setTuitLikedStatus] = useState({ status: "nothing" });

    const checkLiked = () =>
        likesService.checkIfUserLikedTuit("me", tuit._id)
            .then(tuitLikedStatus => setTuitLikedStatus(tuitLikedStatus));

    useEffect(checkLiked, { status: "nothing" });


    const [tuitDislikedStatus, setTuitDislikedStatus] = useState({ status: "nothing" });

    const checkDisliked = () =>
        dislikesService.checkIfUserDislikedTuit("me", tuit._id)
            .then(tuitDislikedStatus => setTuitDislikedStatus(tuitDislikedStatus));

    useEffect(checkDisliked, { status: "nothing" });

    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"></i>
                {tuit.stats &&
                    <span className="ttr-stats-replies">{tuit.stats.replies}</span>
                }
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"></i>
                {tuit.stats &&
                    <span className="ttr-stats-retuits">{tuit.stats.retuits}</span>
                }
            </div>
            <div className="col">
                <span className="ttr-like-tuit-click" onClick={() => {
                    likeTuit(tuit);
                    setTimeout(() => { window.location.reload(); }, 500);
                }}>

                    {

                        tuitLikedStatus["status"] === "liked" &&
                        <i className="fa-solid fa-thumbs-up" style={{ color: "red" }} />

                    }
                    {
                        tuitLikedStatus["status"] === "nothing" &&
                        <i className="fa-solid fa-thumbs-up" />
                    }

                </span>

                <span className="ttr-stats-likes">{tuit.stats && tuit.stats.likes}</span>

                <span className="ttr-like-tuit-click" onClick={(event) => {
                    dislikeTuit(tuit);
                    setTimeout(() => { window.location.reload(); }, 500);
                }}>

                    {

                        tuitDislikedStatus["status"] === "disliked" &&
                        <i className="fa-solid fa-thumbs-down" style={{ color: "red" }} />

                    }
                    {
                        tuitDislikedStatus["status"] === "nothing" &&
                        <i className="fa-solid fa-thumbs-down" />
                    }


                </span>

            </div>

            <div className="col">
                <i className="far fa-inbox-out"></i>
            </div>
        </div>
    );
}
export default TuitStats;