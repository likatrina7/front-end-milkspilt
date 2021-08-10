import React from "react";
import { Link } from "react-router-dom";
import "./QuestionRow.css";
import moment from "moment";

const QuestionRow = (props) => {
  let ageText = "";
  if (props.age === "0") {
    ageText = "Baby";
  } else if (props.age === "1") {
    ageText = "Toddler";
  } else if (props.age === "2") {
    ageText = "T3-T5";
  } else if (props.age === "3") {
    ageText = "T6-T8";
  } else if (props.age === "4") {
    ageText = "T9-T12";
  }

  const getRelativeTime = (time) => {
    const newTime = moment(time);
    const absolute = newTime.format("MMMM Do YYYY, h:mm:ss a");
    const relative = newTime.fromNow();
    return relative;
  };

  const askTime = getRelativeTime(props.date);
  console.log(askTime);

  return (
    <div className="row-area">
      <div className="stat-element">
        <div className="line-space">{props.voteCount}</div>
        <div className="stat-style">votes</div>
      </div>
      <div className="stat-element">
        <div className="line-space">{props.answerCount}</div>
        <div className="stat-style">answers</div>
      </div>
      <div className="stat-element">
        <div className="line-space">{props.viewCount}</div>
        <div className="stat-style">views</div>
      </div>
      <div className="question-element">
        <Link to={`/questions/${props.id}`}>
          <div className="title">{props.title}</div>
        </Link>
        <div className="title-stat">
          <div className="line-space">
            <span className="tag">{ageText}</span>
            <span className="tag">{props.category}</span>
          </div>
          <span className="date-style">
            Posted {askTime} by {props.user}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuestionRow;
