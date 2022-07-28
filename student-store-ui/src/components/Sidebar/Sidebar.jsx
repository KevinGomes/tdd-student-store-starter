import * as React from "react"
import "./Sidebar.css"
import ShoppingCart from "../ShoppingCart/ShoppingCart"

export default function Sidebar(props) {
  return (
    <section className={props.isOpen ? "sidebar open" : "sidebar closed"}>
        <div className="wrapper"> 
          <button class="toggle-button button closed" onClick={props.toggle}>
            <i class="material-icons md-48">arrow_forward</i>
          </button>
          <ShoppingCart isOpen={props.isOpen} products={props.getProducts} shoppingCart={props.shoppingCart}/>
          <input
              className="form-input"
              type="email"
              name="email"
              placeholder="user@email.com"
              autoComplete="off"
              required
            />
            <br/>
            <input
              className="form-input"
              type="text"
              name="name"
              placeholder="Enter your name"
              autoComplete="off"
              required
            />
            <button class="toggle-button button closed" onClick={props.toggle}>
            Place Order
          </button>
        </div>
    </section>
  )
}
