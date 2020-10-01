import React from "react"
import Logo from "../../assets/logo.jpg"
import "./Header.scss"

const Header = () => {
  return (
    <div
      id="header"
      className="display-flex align-items-center justify-content-space-between"
    >
      <img src={Logo} alt="logo" className="logo" />
      <p className="challenge">
        <span>Link</span>VOTE Challenge
      </p>
    </div>
  )
}

export default Header
