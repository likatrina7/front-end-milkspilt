import React, { useState } from "react";
import axios from "axios";
import "./askQuestion.css";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [age, setAge] = useState("0");
  const [category, setCategory] = useState("sleep");

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = {
      title: title,
      content: body,
      age_tag: age,
      cat_tag: category,
      author_id: 1,
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/questions`, question)
      .then((response) => {
        console.log("Response:", response.data.question);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't submit the question.");
      });
  };

  return (
    <main>
      <h1>Ask a public Question</h1>
      <section className="container">
        <div className="question-area">
          <form onSubmit={handleSubmit}>
            <label className="label-style">Title</label>
            <p>Summarize the problem</p>
            <textarea
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="title-input"
            />
            <label className="label-style">Body</label>
            <p>Describe what you've tried</p>
            <textarea
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="body-input"
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
                <option value="sleep">Sleep</option>
                <option value="feeding">Feeding</option>
                <option value="behavior">Behavior</option>
                <option value="emotion">Emotion</option>
                <option value="health">Health</option>
              </select>
            </div>
            <input type="submit" value="Submit" className="form-submit" />
          </form>
        </div>
        <div className="question-area">
          <h2>Tips on getting good answers quickly</h2>
          <h4>
            The community is here to help you with specific parenting questions,
            such as emotions & behaviors, feeding & nutrition or child safety.
          </h4>
          <ul>
            <li>Make sure your question has not been asked already</li>
            <li>Keep your question short and to the point</li>
            <li>Double-check grammar and spelling</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default AskQuestion;
