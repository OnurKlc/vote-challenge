import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"

import "./Pagination.scss"
import Icon from "../../scripts/icon"
import actions from "../../redux/actions"

const Pagination = ({ itemCount }) => {
  const activePage = useSelector((state) => state.activePage)

  const dispatch = useDispatch()

  const pageCount = Array.from(new Array(Math.floor(itemCount / 5) + 1))

  const onPaginationClick = (page) => {
    dispatch(actions.pageChange(page))
  }

  const onChevronClick = (num) => {
    const _activePage = activePage + num
    dispatch(actions.pageChange(_activePage))
  }

  useEffect(() => {
    dispatch(actions.pageChange(activePage))
  }, [activePage])

  return (
    <div id="pagination">
      <Icon
        icon="chevron-left"
        size={16}
        style={
          activePage !== 1
            ? { cursor: "pointer" }
            : { opacity: "0.5", pointerEvents: "none" }
        }
        onClick={() => onChevronClick(-1)}
      />
      {pageCount.map((number, index) => (
        <div
          key={Math.random()}
          role="button"
          tabIndex={0}
          onClick={() => onPaginationClick(index + 1)}
          onKeyDown={() => onPaginationClick(index + 1)}
          className={`page-number ${activePage === index + 1 ? "active" : ""}`}
        >
          {index + 1}
        </div>
      ))}
      <Icon
        icon="chevron-right"
        size={16}
        style={
          activePage !== pageCount.length
            ? { cursor: "pointer" }
            : { opacity: "0.5", pointerEvents: "none" }
        }
        onClick={() => onChevronClick(1)}
      />
    </div>
  )
}

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
}

export default Pagination
