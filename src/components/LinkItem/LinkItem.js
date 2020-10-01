import React from "react"
import "./LinkItem.scss"

const LinkItem = () => {
  return (
    <div className="display-flex" id="linkItem">
      <div className="point">
        <span>6</span> <span>Points</span>
      </div>
      <div className="text-container">
        <div>Hacker News</div>
        <div>(https://news.ycombinator.com/)</div>
        <div>
          <span>&#8593; Up Vote</span>
          <span>&#8595; Down Vote</span>
        </div>
      </div>
      <div className="delete-button">
        <div className="delete-inner" />
      </div>
    </div>
  )
}

export default LinkItem
