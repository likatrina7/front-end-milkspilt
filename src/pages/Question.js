import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

const Question = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState("");
    const [answerId, setAnswerId] = useState([]);
    const [answer, setAnswer] = useState([]);
    let answers = ['afasdfafa', 'babaab']
    let answerid = 0

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/questions/${id}`)
        .then((response) => {
            console.log("Response:", response.data);
            setQuestion(response.data)
            const newAnswerId = [...answerId]
            for (answerid of response.data.answer) {
                newAnswerId.push(answerid)
            }
            setAnswerId(newAnswerId)
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    }, []);

    useEffect(() => {
        for (answerid of answerId){
            console.log("ehlllllll")
            console.log(answerid)
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/questions/${answerid}`)
            .then((response) => {
                const newAnswer = [...answer]
                newAnswer.push(response.data.content)
                setAnswer(newAnswer)
            })
            .catch((error) => {
                console.log("Error:", error);
        });}
    }, [answerId]);

    // const answerComponent = ({answers}) => (
    //     <div className="answer">
    //         {answers.map((answer) => <div>{ answer }</div>)} 
    //     </div>
    // )
    // console.log(answers)
    // console.log("sh")
    

    return (
        <main>
            <div className="question">
                <h1 className="questiontitle">{question.title}</h1>
                <div className="tag">
                    <span>{question.age}</span>
                    <span>{question.category}</span>
                </div>
                <div className="views">
                    {question.views}
                </div>
                <p>{question.content}</p>
            </div>
            { answerId ? 
            <section className="answer">
                <AnswerList/>
            </section>
            : 
            <p>no answers</p>
            }
        </main>
    )
};

export default Question;
