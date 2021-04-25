
import { combineReducers } from 'redux'
import specializedReducer from './reducer1'

const primaryReducer = combineReducers({
  key1: seclializedReducer,
})

export default primaryReducer

