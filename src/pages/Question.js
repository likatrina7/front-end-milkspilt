import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import AnswerList from '../components/AnswerList.js'



const Question = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState([]);
    const [response, setResponse] = useState("");
    let answerid = 0

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/questions/${id}`)
        .then((response) => {
            // console.log("Response:", response.data);
            setQuestion(response.data)
            // const newAnswerId = [...answerId]
            for (answerid of response.data.answer) {
                getAnswer(answerid)
            }
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    }, []);
    
    const getAnswer = (id => {
        const newAnswer = [...answer]
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/answers/${id}`)
        .then((response) => {
            // const newAnswer = [...answer]
            setAnswer(answer => [...answer, response.data])
        })
        .catch((error) => {
            console.log("Error:", error);
    });
    })

    return (
        <main>
            <section className="question">
                <h1 className="questiontitle">{question.title}</h1>
                <div className="tag">
                    <span>{question.age}</span>
                    <span>{question.category}</span>
                </div>
                <div className="views">
                    {question.views}
                </div>
                <p>{question.content}</p>
            </section>
            { answer ? 
            <section className="answer">
                <AnswerList answers={answer}/>
            </section>
            : 
            null
            }
            <section className="response">
                <form>
                    <label className="label-style">Answer</label>
                    <p>Put your answer here</p>
                    <textarea
                        name="response"
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        className="response-input"
                    />
                </form>
                <input type="submit" value="Post" className="form-submit" />

            </section>
        </main>
    )
};

export default Question;
