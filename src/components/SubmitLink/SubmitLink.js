import React from "react"
import { Link } from "react-router-dom"
import "./SubmitLink.scss"

const SubmitLink = () => {
  return (
    <Link to="/addLink" className="submit-link">
      <button type="button">+</button>
      <h2>SUBMIT A LINK</h2>
    </Link>
  )
}

export default SubmitLink
