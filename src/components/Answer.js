import React from 'react';
import './Answer.css'
import heart from "../media/newheart.gif";


const Answer = (props) => {
    console.log('answer props', props)

    return (
        <div className='answer_content'>
            <span className="answer_body">{props.content}</span>
            <div className="answeruser">
                <img src={props.avatar} alt="answeruser"></img>
                <span className="answerusername">{props.username}</span>
            </div>
        </div>
    )
  }


export default Answer