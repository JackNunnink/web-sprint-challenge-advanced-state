import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const { newQuestion, newTrueAnswer, newFalseAnswer } = props.form;
  const onChange = evt => {
    const { value } = evt.target
    const key = evt.target.id
    props.inputChange({ key, value })
  }

  const disabled = () => {
    if(!newQuestion || !newTrueAnswer || !newFalseAnswer) {
      return true
    } else {
      return false
    }
  } 

  const onSubmit = evt => {
    evt.preventDefault()
    console.log('props', props);
    props.postQuiz(props.form)
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} value={newQuestion} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} value={newTrueAnswer} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} value={newFalseAnswer} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={disabled()}>Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
