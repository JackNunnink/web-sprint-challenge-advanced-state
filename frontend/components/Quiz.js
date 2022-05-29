import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

function Quiz(props) {
  console.log("quiz props", props)
  const handleSelect = () => {
    props.selectAnswer()
  }

  useEffect(() => {
    props.fetchQuiz()
  }, [])

  const disabled = () => {
    if(props.selectedAnswer.answer === false) {
      return true
    } else {
      return false
    }
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        true ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${props.selectedAnswer.answer === true && 'selected' || ''}`} onClick={handleSelect}>
                {props.quiz.answers[0].text}
                <button>
                  {`${props.selectedAnswer.answer === true && 'SELECTED' || 'Select'}`}
                </button>
              </div>

              <div className={`answer ${props.selectedAnswer.answer === true && 'selected' || ''}`} onClick={handleSelect}>
                {props.quiz.answers[1].text}
                <button>
                  {`${props.selectedAnswer.answer === true && 'SELECTED' || 'Select'}`}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" disabled={disabled()}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => st, actionCreators)(Quiz)
