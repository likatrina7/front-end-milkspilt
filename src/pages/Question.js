import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import AnswerList from '../components/AnswerList.js'
import { UserContext } from "../UserContext";
import { useHistory } from "react-router-dom";
import './Question.css'
import moment from 'moment';



const Question = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState([]);
    const [response, setResponse] = useState("");
    const user = useContext(UserContext);
    const history = useHistory();
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const userAnswer = {
          content: response,
          author_id: user.id,
          question_id: id
        };
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/questions/${id}/answer`, userAnswer)
          .then((response) => {
            const answerRes = response.data.answer;
            setAnswer(answer => [...answer, response.data.answer])
            console.log(answerRes)
            if (answerRes) {
              history.push(`/questions/${answerRes.question_id}`);
            }
          })
          .catch((error) => {
            console.log("Error:", error);
            alert("Couldn't submit the answer.");
          });
      };
    const getRelativeTime = (time => {
        const newTime = moment(time);
        const absolute = newTime.format('MMMM Do YYYY, h:mm:ss a');
        const relative = newTime.fromNow();
        return relative
    })

    const askTime = getRelativeTime(question.date_asked)
    console.log(askTime)

    return (
        <main>
            <div className="qacontainer">
                <section className="question">
                    <h1 className="questiontitle">{question.title}</h1>
                    <div className="qtag">
                        <div className='tag'>{question.age}</div>
                        <div className='tag'>{question.category}</div>
                    </div>
                    <div className="views">
                        <div className="view">Viewed {question.views} times</div>
                        <div className="time">Posted {askTime}</div>
                    </div>
                    <p>{question.content}</p>
                    { answer ? 
                        <section className="answer">
                            <AnswerList answers={answer}/>
                        </section>
                        : 
                        null
                    }
                </section>

                <section className="response">
                    <form onSubmit={handleSubmit}>
                        <label className="label-style">Answer</label>
                        <p>Share your wisdom here</p>
                        <textarea
                            name="response"
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            className="response-input"
                        />
                        <input type="submit" value="Post"/>
                    </form>
                </section>
            </div>
        </main>
    )
};

export default Question;
