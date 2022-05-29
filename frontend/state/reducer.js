// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, INPUT_CHANGE, RESET_FORM, SET_INFO_MESSAGE, SET_SELECTED_ANSWER, SET_QUIZ_INTO_STATE } from './action-types'

const initialWheelState = 0
function wheel(position, action) {
  // console.log('position', position)
  switch (action.type) {
    case MOVE_CLOCKWISE:
      return position >= 5 ? position - 5 : position + 1
    
    case MOVE_COUNTERCLOCKWISE:
      return position <= 0 ? position + 5 : position -1
      
    default:
      return position || initialWheelState
  }
}

const initialQuizState = {
  answers: [
    {
      answer_id: '',
      text: ''
    },
    {
      answer_id: '',
      text: ''
    }
  ],
  question: '',
  quiz_id: ''
}
function quiz(state = initialQuizState, action) {
  // console.log("quiz action", action.payload)
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      return {
        ...state,
        answers: [
          {
            answer_id: action.payload.answers[0].answer_id,
            text: action.payload.answers[0].text
          },
          {
            answer_id: action.payload.answers[1].answer_id,
            text: action.payload.answers[1].text
          }
        ],
        question: action.payload.question,
        quiz_id: action.payload.quiz_id
      }

      default:
        return state || initialQuizState
  }
}

const initialSelectedAnswerState = {
  answer: false
}
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case SET_SELECTED_ANSWER:
      return {
        ...state,
        answer: !state.answer
      }

    default:
      return state || initialSelectedAnswerState 
  }
}

const initialMessageState = { message: '' }
function infoMessage(state = initialMessageState, action) {
  // console.log("action.payload", action.payload)
  switch (action.type) {
    case SET_INFO_MESSAGE: {
      const message = action.payload
      return {
        ...state,
        message: message
      }
    }

    default:
      return state || initialMessageState
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_CHANGE: {
      const { key, value } = action.payload
      return {
        ...state,
        [key]: value.toString().trim()
      }
    }
    
    case RESET_FORM: {
      return initialFormState
    }

    default:
      return state || initialFormState
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
