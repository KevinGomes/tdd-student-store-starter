import * as React from "react"
import Logo from "../Logo/Logo"
import "./Navbar.css"

export default function Navbar(props) {
  console.log(props.navlinks)
  return (
    <nav className="navbar">
      <Logo />
      <NavLinks navLinks={props.navLinks}/>
    </nav>
  )
}

export function NavLinks({navLinks}) {
  return( 
    <ul className="nav-links">
      {navLinks.map((link,index) => 
      <NavLink key={index} navLink={link}/>
      )}
    </ul>
    )
}

export function NavLink({navLink}) {
  return (
    <li>
      <span>{navLink}</span>
    </li>
  )
}