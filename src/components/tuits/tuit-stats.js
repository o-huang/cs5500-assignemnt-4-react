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



  console.log(tuitLikedStatus["status"])
  return (
    <div className="row mt-2">
      <div className="col">
        <i className="far fa-message me-1"></i>
        {tuit.stats && tuit.stats.replies}
      </div>
      <div className="col">
        <i className="far fa-retweet me-1"></i>
        {tuit.stats && tuit.stats.retuits}
      </div>
      <div className="col">
        <span onClick={() => likeTuit(tuit)}>

          {

            tuitLikedStatus["status"] == "liked" &&
            <i className="fa-solid fa-thumbs-up" style={{ color: 'red' }}></i>

          }
          {
            tuitLikedStatus["status"] == "nothing" &&
            <i className="fa-solid fa-thumbs-up"></i>
          }

        </span>
        {tuit.stats && tuit.stats.likes}

        <span onClick={() => dislikeTuit(tuit)}>

          {

            tuitDislikedStatus["status"] == "disliked" &&
            <i className="fa-solid fa-thumbs-down" style={{ color: 'red' }}></i>

          }
          {
            tuitDislikedStatus["status"] == "nothing" &&
            <i className="fa-solid fa-thumbs-down"></i>
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