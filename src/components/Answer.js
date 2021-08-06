import React from 'react';
import './Answer.css'


const Answer = (props) => {
    // console.log('answer props', props)
    return (
        <div className='answer_content'>
            <span>{props.content}</span>
            <span>{props.id}</span>
        </div>
    )
  }


export default Answer