import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import AnswerList from '../components/AnswerList.js'
import { UserContext } from "../UserContext";
import { useHistory } from "react-router-dom";
import './Question.css'
import moment from 'moment';
import heart from "../media/heart.gif";
import little_heart from "../media/little_heart.gif";


const Question = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState({});
    const [vote, setVote] = useState("");
    const [answer, setAnswer] = useState([]);
    const [response, setResponse] = useState("");
    const user = useContext(UserContext);
    const history = useHistory();
    let answerid = 0

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/questions/${id}`)
        .then((response) => {
            setQuestion(response.data)
            setVote(response.data.vote.length)
            getAnswer(response.data.answer)
        })
        .catch((error) => {
            console.log("Error:", error);
            alert("Question not exist.")
        });
    }, []);
    
    const getAnswer = (a => {
        console.log("params", a)
        const queryParams = `params=${a}`
        
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/answers?${queryParams}`)
        // axios.get(`${process.env.REACT_APP_BACKEND_URL}/answers`, {params})
        .then((response) => {
            const newAnswer = response.data
            setAnswer(newAnswer)
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
          username: user.name,
          avatar: user.avatar
        };
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/questions/${id}/answer`, userAnswer)
          .then((response) => {
            const answerRes = response.data.answer;
            setAnswer(answer => [...answer, response.data.answer])
            if (answerRes) {
              history.push(`/questions/${answerRes.question_id}`);
            }
          })
          .catch((error) => {
            console.log("Error:", error);
            alert("Couldn't submit the answer, please leave something here.");
          });
      };
    const getRelativeTime = (time => {
        const newTime = moment(time);
        const absolute = newTime.format('MMMM Do YYYY, h:mm:ss a');
        const relative = newTime.fromNow();
        return relative
    })

    const askTime = getRelativeTime(question.date_asked)

    return (

        <main>
            <div className="qacontainer">
                <section className="question">
                    <h1 className="questiontitle">{question.title}</h1>
                    <div className="qtag">
                        <div className='tagStyle'>{question.age}</div>
                        <div className='tagStyle'>{question.category}</div>
                    </div>
                    <div className="views">
                        <div className="timedata">                        
                            <div className="view">Viewed {question.views} times</div>
                            <div className="time">Posted {askTime}</div>
                        </div>
                        <div className="likebtn"> 
                            <img src={heart} className="heart" alt="likebtn"></img>
                            <span className="votecnt">{vote}</span>
                        </div>
                    </div>
                    <div className="questioninfo">
                        <img src={question.avatar} className="currentuser" alt="user"></img>
                        <div className="dialog1">
                            <p className="questionbody">{question.content}</p>
                        </div>
                        
                    </div>
                    { answer ? 
                        <section className="answer">
                            <AnswerList answers={answer}/>
                        </section>
                        : 
                        null
                    }
                </section>

                <section className="response">
                    <form className="answerForm" onSubmit={handleSubmit}>
                        <div  className="label-style">
                            <label>Answer</label>
                        </div>
                        <div className="hint">
                            <p>Share your wisdom here</p>
                        </div>
                        <div>
                            <textarea
                                className="response-input"
                                name="response"
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                            />
                        </div>
                        <div>
                            <button className="postbtn">Post</button>
                        </div>
                    </form>
                </section>
        </div>
        </main>
    )
};

export default Question;
