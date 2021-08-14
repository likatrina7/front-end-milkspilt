import "./Dashboard.css";
import "./Search.css";
import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import QuestionRow from "../components/QuestionRow";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import axios from "axios";
import { UserContext } from "../UserContext";
import Header from "../components/Header.js";

const Dashboard = () => {
  const history = useHistory();
  const { keyword } = useParams();
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("");
  const user = useContext(UserContext);

  const handleFilterChange = (event, newFilter) => {
    setFilter(newFilter);
  };

  useEffect(async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/search`,
      {
        search_str: keyword,
      }
    );
    if (res && res.data && res.data.length >= 0) {
      setQuestions(res.data);
    }
  }, [keyword]);

  const handleClickAskQ = () => {
    if (user.id) {
      history.push("/questions");
    } else {
      alert("Please log in to ask a question.");
    }
  };

  const handleClickAnswers = () => {
    const resSortedByAnswers = [...questions].sort((a, b) =>
      a.answer < b.answer ? 1 : -1
    );
    setQuestions(resSortedByAnswers);
  };

  const handleClickVotes = () => {
    const resSortedByVotes = [...questions].sort((a, b) =>
      a.vote < b.vote ? 1 : -1
    );
    setQuestions(resSortedByVotes);
  };

  const handleClickViews = () => {
    const resSortedByViews = [...questions].sort((a, b) =>
      a.views < b.views ? 1 : -1
    );
    setQuestions(resSortedByViews);
  };

  const handleClickDate = () => {
    const resSortedByDate = [...questions].sort((a, b) =>
      Date.parse(a.date_asked) < Date.parse(b.date_asked) ? 1 : -1
    );
    setQuestions(resSortedByDate);
  };

  return (
    <React.Fragment>
      <Header />
      <div className="dashboard-area">
        <div className="header-area">
          <h1 className="header-style">Search Results</h1>
          <button className="button-style" onClick={handleClickAskQ}>
            Ask Question
          </button>
        </div>
        <div className="result-box">
          <div className="result-detial">
            {questions.length} Results for {keyword}
          </div>
          <div className="filter-btn-box">
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilterChange}
              size="small"
            >
              <ToggleButton onClick={handleClickVotes} value="votes">
                Votes
              </ToggleButton>
              <ToggleButton onClick={handleClickAnswers} value="answers">
                Answers
              </ToggleButton>
              <ToggleButton onClick={handleClickViews} value="views">
                Views
              </ToggleButton>
              <ToggleButton onClick={handleClickDate} value="date">
                Date
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <div className="qr-box">
          {questions.map((q, i) => {
            return (
              <QuestionRow
                title={q.title}
                age={q.age}
                category={q.category}
                date={q.date_asked}
                id={q.question_id}
                key={i}
                viewCount={q.views}
                answerCount={q.answer}
                voteCount={q.vote}
                username={q.username}
              />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
