import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Hero from "../Hero/Hero"
import Home from "../Home/Home"
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

const navlinks = ["Home", "About Us", "Contact Us", "Buy Now"]



export default function App() {

  const [products, setProducts] = useState([])
 //const [isFetching, setIsFetching] = useState(false)
 const [error,setError] = useState("")
 //const [isOpen,setIsOpen] = useState(false)
 //const [cart,setCart] = useState([])
 //const [checkout,setcheckout] = useState("")
 //const [searchForm, setSearchForm] = useState("")

  const getData = async () => {
    const { data } = await axios.get(`https://codepath-store-api.herokuapp.com/store`)
    const productArr = data.products

    if(productArr.length > 0) {
      setProducts(productArr)
    }
    else{
      setError("Call Failure")
    }
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div className="app">
      <BrowserRouter>
        <main>
          {/* YOUR CODE HERE! */}
          <Sidebar />
          <Navbar navLinks = {navlinks}/>
          <Hero/>
          <Home products={products}/>
          <div>
            <h2>About</h2>
            <p>The codepath student store offers great products at great prices from a great team and for a great cause.

We've searched far and wide for items that perk the interests of even the most eccentric students and decided to offer them all here in one place.

All proceeds go towards bringing high quality CS education to college students around the country.</p>
          </div>
          <div>

          <h2>Contact Us</h2>
            <p>Email:
code@path.org
Phone:
1-800-CODEPATH
Address:
123 Fake Street, San Francisco, CA</p>
          </div>
        </main>
      </BrowserRouter>
    </div>
  )
}


