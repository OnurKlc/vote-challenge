import React from "react"
import PropTypes from "prop-types"
import { confirmAlert } from "react-confirm-alert"

import { LOCAL_STORAGE_OBJECT } from "../../scripts/constants"

import "./LinkItem.scss"

const LinkItem = ({ data, getData }) => {
  const onVoteClick = (num) => {
    const copyData = { ...data }
    copyData.voteCount += num
    const links = JSON.parse(localStorage.getItem(LOCAL_STORAGE_OBJECT))
    const index = links.findIndex((link) => link.id === copyData.id)
    links.splice(index, 1, copyData)
    localStorage.setItem(LOCAL_STORAGE_OBJECT, JSON.stringify(links))
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
                  const links = JSON.parse(
                    localStorage.getItem(LOCAL_STORAGE_OBJECT)
                  )
                  const index = links.findIndex((link) => link.id === data.id)
                  links.splice(index, 1)
                  localStorage.setItem(
                    LOCAL_STORAGE_OBJECT,
                    JSON.stringify(links)
                  )
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
        <div>{data.name}</div>
        <div>({data.url})</div>
        <div>
          <button type="button" onClick={() => onVoteClick(1)}>
            &#8593; Up Vote
          </button>
          <button type="button" onClick={() => onVoteClick(-1)}>
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
    timestamp: PropTypes.number,
    voteCount: PropTypes.number,
  }).isRequired,
  getData: PropTypes.func.isRequired,
}

export default LinkItem
