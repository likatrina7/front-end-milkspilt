import React from 'react';


const Answer = (props) => {
    console.log('answer props', props)
    return (
      <div className='answer_container'>
          <div className='answer_content'>
              <span>{props.content}</span>
          </div>
      </div>
    )
  }


export default Answer