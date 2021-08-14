import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuestionRow from "../components/QuestionRow";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import axios from "axios";
import Header from "../components/Header.js";

const Dashboard = () => {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [age, setAge] = useState("all");
  const [category, setCategory] = useState("all");
  const [filter, setFilter] = React.useState("");

  const handleFilterChange = (event, newFilter) => {
    setFilter(newFilter);
  };

  useEffect(async () => {
    handleFormSubmit();
  }, [age, category]);
  const handleClickAskQ = () => {
    history.push("/questions");
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleFormSubmit = async () => {
    const queryParams = [];
    if (age !== "all") {
      queryParams.push(`age=${age}`);
    }
    if (category !== "all") {
      queryParams.push(`category=${category}`);
    }
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/questions?${queryParams.join("&")}`
    );
    if (res && res.data && res.data.length >= 0) {
      // const qs = res.data;
      // const resSortedByViews = qs.sort((a, b) => (a.views < b.views ? 1 : -1));
      setQuestions(res.data);
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
          <h1 className="header-style">Top Questions</h1>
          <button className="button-style" onClick={handleClickAskQ}>
            Ask Question
          </button>
        </div>
        <div className="filter-box">
          <form className="filter-area">
            <div className="tag-style">Age</div>
            <select
              name="age"
              value={age}
              onChange={handleAgeChange}
              className="select-style"
            >
              <option value="all">All</option>
              <option value="0">Baby</option>
              <option value="1">Toddler</option>
              <option value="2">T3-T5</option>
              <option value="3">T6-T8</option>
              <option value="4">T9-T12</option>
            </select>
            <div className="tag-style">Category</div>
            <select
              name="category"
              value={category}
              onChange={handleCategoryChange}
              className="select-style"
            >
              <option value="all">All</option>
              <option value="sleep">Sleep</option>
              <option value="feeding">Feeding</option>
              <option value="behavior">Behavior</option>
              <option value="emotion">Emotion</option>
              <option value="health">Health</option>
            </select>
          </form>
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
