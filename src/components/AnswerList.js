import React from 'react';
import Answer from './Answer';
import './AnswerList.css'

const AnswerList = (props) => {
    // console.log('answerlist props', props)
    const answerComponent = props.answers.map((answer) => {
        return (
            <li className='answer_list' key={answer.answer_id}>
                <Answer
                    id={answer.answer_id}
                    content={answer.content}
                    date_answered={answer.date_answered}
                >
                </Answer>
            </li>  
        ); 
    });
    return (
        <section>
            <ul>
                {answerComponent}
            </ul>
        </section>
    );
};

export default AnswerList;