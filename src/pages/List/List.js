import React, { useCallback, useEffect, useState } from "react"

import "./List.scss"
import SubmitLink from "../../components/SubmitLink/SubmitLink"
import LinkItem from "../../components/LinkItem/LinkItem"
import { LOCAL_STORAGE_OBJECT } from "../../scripts/constants"

const List = () => {
  const [listData, setListData] = useState()
  const [order, setOrder] = useState("most")

  const sortAscending = (data) => {
    data.sort((a, b) => parseFloat(b.voteCount) - parseFloat(a.voteCount))
    setListData([...data])
  }

  const sortDescending = (data) => {
    data.sort((a, b) => parseFloat(a.voteCount) - parseFloat(b.voteCount))
    setListData([...data])
  }

  const fetchData = useCallback(() => {
    const _listData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_OBJECT))
    if (order === "most") {
      sortAscending(_listData)
    } else {
      sortDescending(_listData)
    }
  }, [order])

  const onSelectChange = (event) => {
    if (event.target.value === "less") {
      sortDescending(listData)
    } else {
      sortAscending(listData)
    }
    setOrder(event.target.value)
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div id="listPage">
      <SubmitLink />
      <hr />
      <div className="select-container ml-10">
        <select
          className="select"
          defaultValue="placeholder"
          onChange={onSelectChange}
        >
          <option value="placeholder" disabled hidden>
            Order by
          </option>
          <option value="most">Most Voted (Z &#8594; A)</option>
          <option value="less">Less Voted (A &#8594; Z)</option>
        </select>
        <span>&#9660;</span>
      </div>
      {listData &&
        listData.map((listItem) => (
          <LinkItem key={listItem.id} data={listItem} getData={fetchData} />
        ))}
    </div>
  )
}

export default List
