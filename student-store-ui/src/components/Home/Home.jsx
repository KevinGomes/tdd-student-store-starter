import * as React from "react"
import "./Home.css"

export default function Home(props) {
  console.log(props.products)
  return (
    <div className="home">
      <ProductGridWapper 
      addItem = {props.addItem}
      removeItem={props.removeItem}
      products={props.products} 
      shoppingCart={props.shoppingCart}
      setCategory={props.setCategory} 
      setInput={props.setInput} 
      filterArr={props.filterArr}
      categoryArr={props.categoryArr}
      
      
      />
      <BottomPage/>
    </div>
    
  )
}
function BottomPage(props) {
  return(
    <>
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
  </>
  )
}

function ProductGridWapper(props) {
  
  function setCat(e){
    e.preventDefault()
    props.setCategory(e.target.innerText)
  }

  return(
    <>
    <div className="input-wrapper">
    <form className="input">
        <input type="search" placeholder="Search" className="input-form"></input>
        <div className="input-titles">
            <button className="input-btn" onClick={e => setCat(e)}>All Categories</button>
            <button className="input-btn" onClick={e => setCat(e)}>Clothing</button>
            <button className="input-btn" onClick={e => setCat(e)}>Food</button>
            <button className="input-btn" onClick={e => setCat(e)}>Accessories</button>
            <button className="input-btn" onClick={e => setCat(e)}>Tech</button>
        </div>
    </form>
    </div>
    <div className="grid-container">
      { props.products.map(product => <ProductCard key={product.id} product={product} addItem = {props.addItem} removeItem={props.removeItem} shoppingCart={props.shoppingCart}/> )}
    </div>
    </>
  )
}

function ProductCard(props) {
  let priceFixed = (props.product.price).toFixed(2)
  let numOfItems = 0
  
  props.shoppingCart.map(item => {
    if(item.itemId == props.product.id){
        if(numOfItems >= 0){
          numOfItems = item.amount
        }
    }
})

  return(
    <>

    <div className="product-card" >
      <div className="product-img">
        <img src={props.product.image} alt="product cover" loading="lazy"/>
      </div>
      <div className="product-info">
        <div className="main-info">
          <p>{props.product.name}</p>
          <p>{priceFixed}</p>
          <div className="bottom-info">
            <button onClick={() => props.removeItem(props.product.id)}>-</button>
            <p>{numOfItems}</p>
            <button onClick={() => props.addItem(props.product.id)}>+</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}