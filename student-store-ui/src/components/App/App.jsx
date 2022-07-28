import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Hero from "../Hero/Hero"
import Home from "../Home/Home"
import ProductDetail from "../ProductDetail/ProductDetail"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css"
import axios from "axios"
import { useState } from "react"

const navlinks = ["Home", "About Us", "Contact Us", "Buy Now"]



export default function App() {

  const [products, setProducts] = useState([])
  const[isFetching, setIsFetching] = useState(false)
  const [error,setError] = useState("")
  const[isOpen,setIsOpen] = useState(false)
  const[category,setCategory] = useState("")  
  const[shoppingCart, setShoppingCart] = useState([{itemId:"", amount: 0}]);
  const[checkOutForm, setCheckOutForm] = useState({email:"", name:""});
  const[success, setSuccess] = useState(false)
  const[input, setInput] = useState("")

  async function getProducts(){
    setIsFetching(true);
    const data = await axios.get("http://localhost:3001/store")
    .then((e) => {
      setProducts(e.data.products);
    })
  }

  React.useEffect(() => {getProducts()},[])
  
  const toggle = () => {
    setIsOpen(prev => !prev)
  }

  let categoryArr = [];
  let filterArr = [];
  
  function filterCategories(category){
    category = category.toLowerCase();
    if(category === "nothing"){
      return categoryArr = products;
    }
    categoryArr = products.filter(e => {
      return e.category.includes(category);
    })
  }
  filterCategories(category)
  
  function filterProduts(input){
    filterArr = products.filter(e => {
      let name = e.name;
      name = name.toLowerCase();
      return (name.includes(input))
    })
  } 
  filterProduts(input)

  function addItem(productId){
    let inCart = false
    let item = 0
    shoppingCart.forEach(e => {
      if(e.itemId == productId){
        inCart = true
        item = e
        return
      }
    })

    if(inCart){
      let i = shoppingCart.indexOf(item);
      let newArr = [...shoppingCart]
      newArr[i].amount += 1;
      setShoppingCart(newArr);
    }
    else{
      setShoppingCart((prevCart) => [...prevCart, {itemId:productId, amount:1}])
    }
  }

  function removeItem(productID){
    let inCart = false
    let item = 0
    shoppingCart.forEach(e => {
      if(e.itemId === productID){
        inCart = true
        item = e
        return
      }
    })

    if(inCart){
      let i = shoppingCart.indexOf(item)
      let newArr = [...shoppingCart]
      if(newArr[i].amount == 0){
        newArr[i].amount = 0
        setShoppingCart(newArr)
      }
      else{
        newArr[i].amount -= 1
        setShoppingCart(newArr)
      }
      
    }
    else{
      setShoppingCart((prevCart) => [...prevCart, {itemId:productID, amount:0}])
    }
  } 

  function handleCheckoutForm(e){
    let name = "";
    let email = "";
    if(e.target.name == "email"){
      name = checkOutForm.name;
      setCheckOutForm({email: e.target.value, name:name})
    }
    if(e.target.name == "name"){
      email = checkOutForm.email;
      setCheckOutForm({email:email, name: e.target.value})
    }
  }

  async function submitCheckoutFrom(){
    let checkoutArr = []
    shoppingCart.map((item,i) => {
      if(item.itemId != 0){
        checkoutArr.push(item)
      }
    })
    const sendForm = async () =>  {
      const req = await axios.post("http://localhost:3001/store",{ user: checkOutForm, shoppingCart: checkoutArr})
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err)
        })
      }
      sendForm()
      setShoppingCart([{itemId:"", quantity: 0}])
      setCheckOutForm({email:"", name:""})
  }

  return (
    <div className="app">
      <BrowserRouter>
        <main>
            <Sidebar 
            isOpen={isOpen}
            shoppingCart={shoppingCart} 
            checkOutForm={checkOutForm} 
            handleCheckoutForm={handleCheckoutForm} 
            submitCheckoutFrom={submitCheckoutFrom} 
            toggle={toggle}
            success={success}
            getProducts={products}
            />
            <Navbar navLinks = {navlinks}/>
            <Routes>
              <Route path="/" element={<Hero/>}/>  
              <Route path="/products/:productId" element={<ProductDetail/>}/>   
            </Routes>
            <Home 
            addItem = {addItem}
            removeItem={removeItem}
            products={products} 
            shoppingCart={shoppingCart}
            setCategory={setCategory} 
            setInput={setInput} 
            filterArr={filterArr}
            categoryArr={categoryArr}
            />
        </main>
      </BrowserRouter>
    </div>
  )
}


