import * as React from "react"
import { Link } from "react-router-dom"
import "./Logo.css"

export default function Logo() {
    return (
        <div className="logo">
            <Link to="/">
                <img src="../../assets/codepath.f1b3e41a.svg" alt="logo" />
            </Link>
        </div>
    )
}