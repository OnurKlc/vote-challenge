import React from "react"

import "./List.scss"
import SubmitLink from "../../components/SubmitLink/SubmitLink"
import LinkItem from "../../components/LinkItem/LinkItem"

const List = () => {
  return (
    <div id="listPage">
      <SubmitLink />
      <hr />
      <div className="select-container ml-10">
        <select className="select" defaultValue="placeholder">
          <option value="placeholder" disabled hidden>
            Order by
          </option>
          <option value="most">Most Voted (Z &#8594; A)</option>
          <option value="less">Less Voted (A &#8594; Z)</option>
        </select>
        <span>&#9660;</span>
      </div>
      <LinkItem />
    </div>
  )
}

export default List
