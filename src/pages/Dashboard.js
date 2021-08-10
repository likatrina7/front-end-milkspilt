import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuestionRow from "../components/QuestionRow";
import axios from "axios";

const Dashboard = () => {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [age, setAge] = useState("all");
  const [category, setCategory] = useState("all");

  useEffect(async () => {
    handleFormSubmit();
  }, []);

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
    if (res && res.data && res.data.length > 0) {
      const questions = res.data;
      const resSortedByViews = questions.sort((a, b) =>
        a.views < b.views ? 1 : -1
      );
      setQuestions(resSortedByViews);
    }
  };

  return (
    <div className="dashboard-area">
      <div className="header-area">
        <h1 className="header-style">Top Questions</h1>
        <button className="button-style" onClick={handleClickAskQ}>
          Ask Question
        </button>
      </div>
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
              user={q.author_id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
