// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios"
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, INPUT_CHANGE, RESET_FORM, SET_INFO_MESSAGE } from './action-types'

export function moveClockwise() {
  return {
    type: MOVE_CLOCKWISE
  }
}

export function moveCounterClockwise() {
  return {
    type: MOVE_COUNTERCLOCKWISE
  }
}

export function selectAnswer() {
  
}

export function setMessage(message) {
  console.log("message", message)
  return {
    type: SET_INFO_MESSAGE,
    payload: message
  }
}

export function setQuiz() { }

export function inputChange({ key, value }) {
  console.log(key, value)
  return {
    type: INPUT_CHANGE,
    payload: { key, value }
  }
}

export function resetForm() {
  return {
    type: RESET_FORM
  }
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz({ newTrueAnswer, newQuestion, newFalseAnswer }) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    const newForm = {
      question_text: newQuestion,
      true_answer_text: newTrueAnswer,
      false_answer_text: newFalseAnswer
    }
    axios.post(`http://localhost:9000/api/quiz/new`, newForm)
      .then(res => {
        // console.log('response', res)
        dispatch(setMessage(`Congrats: "${newQuestion}" is a great question!`))
      })
      .catch(err => {
        console.error('error', err)
      })
      .finally(() => {
        dispatch(resetForm())
      })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
