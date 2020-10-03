import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import "./AddLink.scss"
import { LOCAL_STORAGE_OBJECT } from "../../scripts/constants"

class LinkItem {
  constructor(name, url) {
    this.name = name
    this.url = url
    this.id = Math.floor(Math.random() * 10 ** 15)
    this.createDate = Date.now()
    this.voteCount = 0
    this.voteDate = 0
  }
}

const AddLink = () => {
  const [emptyNameField, setEmptyNameField] = useState()
  const [emptyUrlField, setEmptyUrlField] = useState()

  const linkName = useRef()
  const linkUrl = useRef()

  const validateUrl = (url) => {
    // https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      url
    )
  }

  const addLink = (link) => {
    let links = localStorage.getItem(LOCAL_STORAGE_OBJECT)
    if (links) {
      links = JSON.parse(links)
      links.push(link)
      localStorage.setItem(LOCAL_STORAGE_OBJECT, JSON.stringify(links))
    } else {
      links = [link]
      localStorage.setItem(LOCAL_STORAGE_OBJECT, JSON.stringify(links))
    }
  }

  const onAddClick = () => {
    const nameValue = linkName.current.value
    const urlValue = linkUrl.current.value
    if (nameValue.trim() === "") {
      toast.error("Name field is required!")
      setEmptyNameField(true)
    } else if (!validateUrl(urlValue)) {
      toast.error("Please enter a valid URL")
      setEmptyUrlField(true)
    } else {
      toast.success(`${nameValue} added.`)
      const link = new LinkItem(nameValue, urlValue)
      addLink(link)
      linkName.current.value = ""
      linkUrl.current.value = ""
    }
  }

  const onInputChange = () => {
    if (linkName.current.value.trim() !== "") {
      setEmptyNameField(false)
    }
    if (linkUrl.current.value !== "") {
      setEmptyUrlField(false)
    }
  }

  return (
    <div id="addLinkPage">
      <Link to="/list" className="return-link">
        &#8592; Return to List
      </Link>
      <h2>Add New Link</h2>
      <div>
        <label htmlFor="name" className="link-name">
          <span className="ml-5">Link Name:</span>
          <input
            type="text"
            id="name"
            placeholder="e.g. Alphabet"
            ref={linkName}
            style={{
              borderColor: emptyNameField ? "red" : "rgb(209, 209, 209)",
            }}
            onChange={onInputChange}
          />
        </label>
        <label htmlFor="url" className="link-url">
          <span className="ml-5">Link URL:</span>
          <input
            type="text"
            id="url"
            placeholder="e.g. http://abc.xyz"
            ref={linkUrl}
            style={{
              borderColor: emptyUrlField ? "red" : "rgb(209, 209, 209)",
            }}
            onChange={onInputChange}
          />
        </label>
      </div>
      <button type="button" className="add-button" onClick={onAddClick}>
        ADD
      </button>
    </div>
  )
}

export default AddLink
