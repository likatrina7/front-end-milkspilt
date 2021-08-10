import React from 'react';
import './Answer.css'
import icon from "../media/user-icon.jpg";


const Answer = (props) => {
    console.log('answer props', props)

    return (
        <div className='answer_content'>
            <span className="answer_body">{props.content}</span>
            <img src={props.avatar} className="answeruser" alt="answeruser"></img>
        </div>
    )
  }


export default Answer