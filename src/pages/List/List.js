import React, { useCallback, useEffect, useState } from "react"

import "./List.scss"
import { useSelector } from "react-redux"
import NoDataIcon from "../../assets/nodata.png"
import SubmitLink from "../../components/SubmitLink/SubmitLink"
import LinkItem from "../../components/LinkItem/LinkItem"
import {
  LOCAL_STORAGE_OBJECT,
  ORDER_LIST_ASCENDING,
  ORDER_LIST_DESCENDING,
} from "../../scripts/constants"
import Pagination from "../../components/Pagination/Pagination"

const List = () => {
  const [listData, setListData] = useState()
  const [order, setOrder] = useState("date")
  const [emptyData, setEmptyData] = useState()

  const activePage = useSelector((state) => state.activePage)

  const sortAscending = (data) => {
    data.sort((a, b) => parseFloat(b.voteCount) - parseFloat(a.voteCount))
    setListData([...data])
  }

  const sortDescending = (data) => {
    data.sort((a, b) => parseFloat(a.voteCount) - parseFloat(b.voteCount))
    setListData([...data])
  }

  const sortByDate = (data) => {
    data.sort((a, b) => parseFloat(b.timestamp) - parseFloat(a.timestamp))
    setListData([...data])
  }

  const fetchData = useCallback(() => {
    const _listData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_OBJECT))
    if (_listData === null) {
      setEmptyData(true)
    } else if (_listData && _listData.length === 0) {
      setEmptyData(true)
    } else {
      setEmptyData(false)
    }
    if (_listData) {
      if (order === ORDER_LIST_ASCENDING) {
        sortAscending(_listData)
      } else if (order === ORDER_LIST_DESCENDING) {
        sortDescending(_listData)
      } else {
        sortByDate(_listData)
      }
    }
  }, [order])

  const onSelectChange = (event) => {
    if (event.target.value === ORDER_LIST_DESCENDING) {
      sortDescending(listData)
    } else if (event.target.value === ORDER_LIST_ASCENDING) {
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
          <option value={ORDER_LIST_ASCENDING}>Most Voted (Z &#8594; A)</option>
          <option value={ORDER_LIST_DESCENDING}>
            Less Voted (A &#8594; Z)
          </option>
        </select>
        <span>&#9660;</span>
      </div>
      {listData &&
        listData.map(
          (listItem, index) =>
            index + 1 <= activePage * 5 &&
            index + 1 > (activePage - 1) * 5 && (
              <LinkItem key={listItem.id} data={listItem} getData={fetchData} />
            )
        )}
      {emptyData && (
        <div>
          <img className="no-data-icon" src={NoDataIcon} alt="no data" />
        </div>
      )}
      {listData && listData.length > 5 && (
        <Pagination itemCount={listData.length} />
      )}
    </div>
  )
}

export default List
