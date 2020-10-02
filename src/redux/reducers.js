import { combineReducers } from "redux"
import { LOCAL_STORAGE_OBJECT } from "../scripts/constants"

const data = (
  state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_OBJECT)),
  action
) => {
  switch (action.type) {
    case "GET_DATA":
      return [...state]
    case "SET_DATA":
      return state.push(action.payload)
    default:
      return state
  }
}

const activePage = (state = 1, action) => {
  switch (action.type) {
    case "PAGE_CHANGE":
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
  data,
  activePage,
})

export default rootReducer
