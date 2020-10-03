const upVote = (item) => {
  return {
    type: "UP_VOTE",
    payload: item,
  }
}

const downVote = (item) => {
  return {
    type: "DOWN_VOTE",
    payload: item,
  }
}

const removeItem = (item) => {
  return {
    type: "REMOVE_ITEM",
    payload: item,
  }
}

const pageChange = (page) => {
  return {
    type: "PAGE_CHANGE",
    payload: page,
  }
}

const actions = {
  upVote,
  downVote,
  removeItem,
  pageChange,
}

export default actions
