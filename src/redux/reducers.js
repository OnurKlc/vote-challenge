import { combineReducers } from "redux"
import { LOCAL_STORAGE_OBJECT } from "../scripts/constants"

const handleVote = (_item, vote) => {
  const links = JSON.parse(localStorage.getItem(LOCAL_STORAGE_OBJECT))
  const item = { ..._item }
  item.voteCount += vote
  item.voteDate = Date.now()
  const index = links.findIndex((link) => link.id === item.id)
  links.splice(index, 1, item)
  localStorage.setItem(LOCAL_STORAGE_OBJECT, JSON.stringify(links))
}

const handleRemoveItem = (_item) => {
  const links = JSON.parse(localStorage.getItem(LOCAL_STORAGE_OBJECT))
  const index = links.findIndex((link) => link.id === _item.id)
  links.splice(index, 1)
  localStorage.setItem(LOCAL_STORAGE_OBJECT, JSON.stringify(links))
}

const data = (
  state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_OBJECT)),
  action
) => {
  switch (action.type) {
    case "UP_VOTE":
      handleVote(action.payload, 1)
      return state
    case "DOWN_VOTE":
      handleVote(action.payload, -1)
      return state
    case "REMOVE_ITEM":
      handleRemoveItem(action.payload)
      return state
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
