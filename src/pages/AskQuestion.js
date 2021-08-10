import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./AskQuestion.css";
import { UserContext } from "../UserContext";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [age, setAge] = useState("0");
  const [category, setCategory] = useState("sleep");
  const user = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = {
      title: title,
      content: body,
      age_tag: age,
      cat_tag: category,
      author_id: user.id,
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/questions`, question)
      .then((response) => {
        const questionRes = response.data.question;
        if (questionRes) {
          history.push(`/questions/${questionRes.question_id}`);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't submit the question.");
      });
  };

  return (
    <main className="info-body">
      <div className="container">
        <form onSubmit={handleSubmit} className="question-area">
          <h1 className="aq-title">Ask a public Question</h1>
          <label className="label-style">Title</label>
          <p>Summarize the problem</p>
          <textarea
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
            placeholder="Required*"
          />
          <label className="label-style">Body</label>
          <p>Describe what you've tried</p>
          <textarea
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="body-input"
            placeholder="Required*"
          />
          <label className="label-style">Tags</label>
          <p className="tips-pragraph">
            Select "Age" and "Category" tags to describe what your question is
            about
          </p>
          <div className="tags-area">
            <div className="tag-style">Age</div>
            <select
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            >
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
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Sleep">Sleep</option>
              <option value="Feeding">Feeding</option>
              <option value="Behavior">Behavior</option>
              <option value="Emotion">Emotion</option>
              <option value="Health">Health</option>
            </select>
            <input type="submit" value="Submit" className="form-submit" />
          </div>
        </form>
        <div className="tips-area">
          <div className="tips-box">
            <h2>Tips on getting good answers quickly</h2>
            <h4>
              The community is here to help you with specific parenting
              questions, such as emotions & behaviors, feeding & nutrition or
              child safety.
            </h4>
            <ul>
              <li>Make sure your question has not been asked already</li>
              <li>Keep your question short and to the point</li>
              <li>Double-check grammar and spelling</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AskQuestion;
