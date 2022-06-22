import * as React from "react"
import "./Sidebar.css"

export default function Sidebar() {
  return (
    <section className="sidebar">
      <div className="sidebar closed">
        <div className="wrapper"> 
          <button class="toggle-button button closed">
            <i class="material-icons md-48">arrow_forward</i>
          </button>
        </div>
      </div>
    </section>
  )
}
