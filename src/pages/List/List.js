import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import "./List.scss"
import NoDataIcon from "../../assets/nodata.png"
import SubmitLink from "../../components/SubmitLink/SubmitLink"
import LinkItem from "../../components/LinkItem/LinkItem"
import {
  LOCAL_STORAGE_OBJECT,
  ORDER_LIST_ASCENDING,
  ORDER_LIST_DESCENDING,
  LINKS_PER_PAGE,
} from "../../scripts/constants"
import Pagination from "../../components/Pagination/Pagination"
import actions from "../../redux/actions"

const List = () => {
  const activePage = useSelector((state) => state.activePage)

  const dispatch = useDispatch()

  const [listData, setListData] = useState()
  const [order, setOrder] = useState("date")
  const [emptyData, setEmptyData] = useState()

  const sortAscending = (_data) => {
    _data.sort((a, b) => {
      if (parseFloat(b.voteCount) - parseFloat(a.voteCount) === 0) {
        return parseFloat(b.voteDate) - parseFloat(a.voteDate)
      }
      return parseFloat(b.voteCount) - parseFloat(a.voteCount)
    })
    setListData([..._data])
  }

  const sortDescending = (_data) => {
    _data.sort((a, b) => {
      if (parseFloat(a.voteCount) - parseFloat(b.voteCount) === 0) {
        return parseFloat(b.voteDate) - parseFloat(a.voteDate)
      }
      return parseFloat(a.voteCount) - parseFloat(b.voteCount)
    })
    setListData([..._data])
  }

  const sortByDate = (_data) => {
    _data.sort((a, b) => parseFloat(b.createDate) - parseFloat(a.createDate))
    setListData([..._data])
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

  useEffect(() => {
    if (listData && listData.length < LINKS_PER_PAGE + 1) {
      dispatch(actions.pageChange(1))
    }
  }, [listData])

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
            Order by Old to New
          </option>
          <option value={ORDER_LIST_ASCENDING}>Most Voted (Z &#8594; A)</option>
          <option value={ORDER_LIST_DESCENDING}>
            Less Voted (A &#8594; Z)
          </option>
        </select>
        <span>&#9660;</span>
      </div>
      {listData && listData.length > 0 && (
        <div className="list-container">
          {listData.map(
            (listItem, index) =>
              index + 1 <= activePage * LINKS_PER_PAGE &&
              index + 1 > (activePage - 1) * LINKS_PER_PAGE && (
                <LinkItem
                  key={listItem.id}
                  data={listItem}
                  getData={fetchData}
                />
              )
          )}
        </div>
      )}
      {emptyData && (
        <div>
          <img className="no-data-icon" src={NoDataIcon} alt="no data" />
        </div>
      )}
      {listData && listData.length > LINKS_PER_PAGE && (
        <Pagination itemCount={listData.length} />
      )}
    </div>
  )
}

export default List
