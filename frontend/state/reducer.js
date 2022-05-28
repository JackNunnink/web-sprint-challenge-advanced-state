// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, INPUT_CHANGE, RESET_FORM, SET_INFO_MESSAGE } from './action-types'

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

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  return state
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
}

const initialMessageState = { message: '' }
function infoMessage(state = initialMessageState, action) {
  console.log("action.payload", action.payload)
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
        [key]: value
      }
    }
    
    case RESET_FORM: {
      return initialFormState
    }

    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
