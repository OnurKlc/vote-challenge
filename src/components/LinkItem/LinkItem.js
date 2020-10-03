import React from "react"
import PropTypes from "prop-types"
import { confirmAlert } from "react-confirm-alert"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"

import "./LinkItem.scss"
import actions from "../../redux/actions"

const LinkItem = ({ data, getData }) => {
  const dispatch = useDispatch()

  const onVoteClick = (vote) => {
    if (vote === "UP_VOTE") {
      dispatch(actions.upVote(data))
    } else if (vote === "DOWN_VOTE") {
      dispatch(actions.downVote(data))
    }
    getData()
  }

  const onRemoveClick = () => {
    confirmAlert({
      // eslint-disable-next-line react/prop-types
      customUI: ({ onClose }) => {
        return (
          <div className="react-confirm-alert-body">
            <h1>Remove Link</h1>
            <div className="react-confirm-alert-message">
              <p>Do you want to remove:</p>
              <p>{data.name}</p>
            </div>
            <div className="react-confirm-alert-button-group">
              <button
                type="button"
                onClick={() => {
                  onClose()
                  dispatch(actions.removeItem(data))
                  toast.success(`${data.name} removed.`)
                  getData()
                }}
              >
                OK
              </button>
              <button type="button" onClick={onClose}>
                CANCEL
              </button>
            </div>
          </div>
        )
      },
    })
  }

  return (
    <div className="display-flex" id="linkItem">
      <div className="point">
        <span>{data.voteCount}</span> <span>Points</span>
      </div>
      <div className="text-container">
        <div title={data.name}>{data.name}</div>
        <div title={data.url}>({data.url})</div>
        <div>
          <button type="button" onClick={() => onVoteClick("UP_VOTE")}>
            &#8593; Up Vote
          </button>
          <button type="button" onClick={() => onVoteClick("DOWN_VOTE")}>
            &#8595; Down Vote
          </button>
        </div>
      </div>
      <button type="button" onClick={onRemoveClick} className="delete-button">
        <div className="delete-inner" />
      </button>
    </div>
  )
}

LinkItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    id: PropTypes.number,
    createDate: PropTypes.number,
    voteCount: PropTypes.number,
    voteDate: PropTypes.number,
  }).isRequired,
  getData: PropTypes.func.isRequired,
}

export default LinkItem
