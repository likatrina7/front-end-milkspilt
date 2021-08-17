import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import AnswerList from "../components/AnswerList.js";
import { UserContext } from "../UserContext";
import { DarkModeContext } from "../DarkModeContext";
import { useHistory } from "react-router-dom";
import "./Question.css";
import moment from "moment";
import heart from "../media/newheart.gif";
import little_heart from "../media/little_heart.gif";
import Header from "../components/Header.js";

const Question = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [vote, setVote] = useState("");
  const [answer, setAnswer] = useState([]);
  const [response, setResponse] = useState("");
  const user = useContext(UserContext);
  const history = useHistory();
  const { isDarkMode } = useContext(DarkModeContext);
  let answerid = 0;


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/questions/${id}`)
      .then((response) => {
        setQuestion(response.data);
        setVote(response.data.vote.length);
        getAnswer(response.data.answer);
      })
      .catch((error) => {
        console.log("Error:", error.response.data.error);
        alert(error.response.data.error);
      });
  }, []);

  const getAnswer = (a) => {
    console.log("params", a);
    const queryParams = `params=${a}`;

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/answers?${queryParams}`)
      // axios.get(`${process.env.REACT_APP_BACKEND_URL}/answers`, {params})
      .then((response) => {
        const newAnswer = response.data;
        setAnswer(newAnswer);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAnswer = {
      content: response,
      author_id: user.id,
      username: user.name,
      avatar: user.avatar,
    };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/questions/${id}/answer`,
        userAnswer
      )
      .then((response) => {
        console.log("response is", response);
        const answerRes = response.data.answer;
        setAnswer((answer) => [...answer, response.data.answer]);
        if (answerRes) {
          history.push(`/questions/${answerRes.question_id}`);
        }
      })
      .catch((error) => {
        console.log("Error is:", error.response.data.error);
        // alert("Couldn't submit the answer, please leave something here.");
        alert(error.response.data.error);
      });
  };
  const getRelativeTime = (time) => {
    const newTime = moment(time);
    const absolute = newTime.format("MMMM Do YYYY, h:mm:ss a");
    const relative = newTime.fromNow();
    return absolute;
  };

  const askTime = getRelativeTime(question.date_asked);

  const voteQuestion = () => {
    const newVote = {
      question_id: id,
      author_id: user.id,
    };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/questions/${id}/vote`,
        newVote
      )
      .then((response) => {
        const voteRes = response.data.vote;
        setVote(vote + 1);
        if (voteRes) {
          history.push(`/questions/${id}`);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        // alert("Couldn't submit the answer, please leave something here.");
        alert(error);
      });
  };

  const bgOneClassName = `bg1 ${isDarkMode ? "" : "light"}`;
  const bgTwoClassName = `bg2 ${isDarkMode ? "" : "light"}`;
  const starClass = `${isDarkMode ? "star" : ""}`;

  return (
    <React.Fragment>
      <Header />
      <main>
        <div className="qacontainer">
          <section className="question">
            <h1 className="questiontitle">
              <p className="qtitle">{question.title}</p>
            </h1>
            <div className="qtag">
              <div className="tagStyle">{question.age}</div>
              <div className="tagStyle">{question.category}</div>
            </div>
            <div className="questioninfo">
              <div className="questionuser">
                <img src={question.avatar} alt="user"></img>
                <div>{question.username}</div>
              </div>
              <p className="content">{question.content}</p>
              <div className="replyarea">
                <div className="likebtn">
                  <img
                    src={heart}
                    className="heart"
                    alt="likebtn"
                    onClick={voteQuestion}
                  ></img>
                  <span className="votecnt"><span className="votenum">{vote}</span>Likes</span>
                </div>
                <p className="content">{question.content}</p>
                <div className="replyarea">
                  <div className="likebtn">
                    <img
                      src={heart}
                      className="heart"
                      alt="likebtn"
                      onClick={voteQuestion}
                    ></img>
                    <span className="votecnt">{vote} Likes</span>
                  </div>
                  <div className="replybtn">
                    <a href="#reply">
                      <div className="rbtn">Reply</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {answer ? (
              <section className="answer">
                <AnswerList answers={answer} />
              </section>
            ) : null}
          </section>

          <section className="response" id="reply">
            <div class="box">
              <div class="box-sm red"></div>
              <div class="box-sm orange"></div>
              <div class="box-sm yellow "></div>
              <div class="box-sm green "></div>
              <div class="box-sm blue "></div>
              <div class="box-sm purple"></div>
            </div>
            <form className="answerForm" onSubmit={handleSubmit}>
              <div className="label-style">
                <label>Answer</label>
                <img
                  src={user.avatar}
                  className="currentuser"
                  alt="currentuser"
                ></img>
              </div>
              <div>
                <textarea
                  placeholder="Share your wisdom here"
                  className="response-input"
                  name="response"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                />
              </div>
              <div className="postarea">
                <button className="postbtn">Post</button>
              </div>
            </form>
          </section>
          <div className={bgOneClassName}></div>
          <div className={bgTwoClassName}></div>
          <div className="bg3"></div>
        </div>
        <span className={starClass}></span>
        <span className={starClass}></span>
        <span className={starClass}></span>
        <span className={starClass}></span>
        <span className={starClass}></span>
        <span className={starClass}></span>
      </main>
    </React.Fragment>
  );
};

export default Question;
