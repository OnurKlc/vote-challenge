import { combineReducers } from "redux"
import { LOCAL_STORAGE_OBJECT } from "../scripts/constants"

const handleUpVote = (_item, _state) => {
  const item = { ..._item }
  item.voteCount += 1
  item.voteDate = Date.now()
  const index = _state.findIndex((link) => link.id === item.id)
  _state.splice(index, 1, item)
  localStorage.setItem(LOCAL_STORAGE_OBJECT, JSON.stringify(_state))
}

const handleDownVote = (_item, _state) => {
  const item = { ..._item }
  item.voteCount -= 1
  item.voteDate = Date.now()
  const index = _state.findIndex((link) => link.id === item.id)
  _state.splice(index, 1, item)
  localStorage.setItem(LOCAL_STORAGE_OBJECT, JSON.stringify(_state))
}

const handleRemoveItem = (_item, _state) => {
  const index = _state.findIndex((link) => link.id === _item.id)
  _state.splice(index, 1)
  localStorage.setItem(LOCAL_STORAGE_OBJECT, JSON.stringify(_state))
}

const data = (
  state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_OBJECT)),
  action
) => {
  switch (action.type) {
    case "UP_VOTE":
      handleUpVote(action.payload, state)
      return [...state]
    case "DOWN_VOTE":
      handleDownVote(action.payload, state)
      return [...state]
    case "REMOVE_ITEM":
      handleRemoveItem(action.payload, state)
      return [...state]
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
