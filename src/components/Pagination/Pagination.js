import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import "./Pagination.scss"
import Icon from "../../scripts/icon"

const Pagination = ({ itemCount, paginationChange }) => {
  const [activePage, setActivePage] = useState(1)

  const pageCount = Array.from(new Array(Math.floor(itemCount / 5) + 1))

  const onPaginationClick = (page) => {
    setActivePage(page)
  }

  const onChevronClick = (num) => {
    if (num === -1 && activePage === 1) {
      //
    } else if (num === 1 && activePage === pageCount.length) {
      //
    } else {
      const _activePage = activePage + num
      setActivePage(_activePage)
    }
  }

  useEffect(() => {
    paginationChange(activePage)
  }, [activePage])

  return (
    <div id="pagination">
      <Icon
        icon="chevron-left"
        size={16}
        style={activePage !== 1 ? { cursor: "pointer" } : { opacity: "0.5" }}
        onClick={() => onChevronClick(-1)}
      />
      {pageCount.map((number, index) => (
        <div
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
            : { opacity: "0.5" }
        }
        onClick={() => onChevronClick(1)}
      />
    </div>
  )
}

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  paginationChange: PropTypes.func.isRequired,
}

export default Pagination
