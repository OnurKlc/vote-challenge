const getData = () => {
  return {
    type: "GET_DATA",
  }
}

const setData = (data) => {
  return {
    type: "SET_DATA",
    payload: data,
  }
}

const upVote = () => {
  return {
    type: "UP_VOTE",
  }
}

const downVote = () => {
  return {
    type: "DOWN_VOTE",
  }
}

const pageChange = (page) => {
  return {
    type: "PAGE_CHANGE",
    payload: page,
  }
}

const actions = {
  getData,
  setData,
  upVote,
  downVote,
  pageChange,
}

export default actions
