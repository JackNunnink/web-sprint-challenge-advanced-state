import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

function Quiz(props) {
  console.log("quiz props", props)
  const handleSelect = (answerId) => {
    props.selectAnswer(answerId)
  }

  useEffect(() => {
    props.fetchQuiz()
  }, [])

  const handleSubmit = () => {
    const answer = {
      quiz_id: props.quiz.quiz_id,
      answer_id: props.selectedAnswer?.answer
    }
    props.postAnswer(answer)
  }

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
              {props.quiz.answers.map((answer, index) => (
                <div className={`answer ${answer.answer_id === props.selectedAnswer?.answer && 'selected'}`} key={index} onClick={() => handleSelect(answer.answer_id)}>
                  {answer.text}
                  <button>{`${answer.answer_id === props.selectedAnswer?.answer && 'SELECTED' || 'Select'}`}</button>
                </div>
              ))}
              {/* <div className={`answer ${props.selectedAnswer.answer === true && 'selected' || ''}`} onClick={() => handleSelect()}>
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
              </div> */}
            </div>

            <button id="submitAnswerBtn" disabled={disabled()} onClick={handleSubmit}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => st, actionCreators)(Quiz)
