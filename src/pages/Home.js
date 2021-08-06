import React from "react";
import "./Home.css";
import video from "../media/home-page-video.mp4";
import icon from "../media/user-icon.jpg";

const Home = () => {
  return (
    <main>
      <section className="daily-question-area">
        <div className="qa-area">
          <div className="qa-style">
            <img src={icon} alt="User Icon" />
            <p>Q: How Do I Get My Infant to Sleep?</p>
          </div>
          <div className="qa-style">
            <img src={icon} alt="User Icon" />
            <p>
              A: All babies have unique sleep patterns and reasons to why they
              sleep how they do or why they have troubles. In fact, some babies
              even need a full year to develop a proper sleep cycle in the
              night. To help them associate bed with sleep, put them in the crib
              when they are sleepy and not fully asleep..............
            </p>
          </div>
        </div>
        <h1 className="daily-question-title">Top Daily Parenting Questions</h1>
      </section>
      <video src={video} controls autoPlay loop></video>
      <section className="ending-area">
        <p>
          How do you think your parenting skills stack up? Want to be a better
          parent?
        </p>
        <p>
          Join the milk spilt community of parents and see parenting in a new
          way.
        </p>
      </section>
    </main>
  );
};

export default Home;
