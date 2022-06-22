import * as React from "react"
import "./Home.css"

export default function Home(props) {
  console.log(props.products)
  return (
    <div className="home">
      <ProductGridWapper products={props.products}/>
    </div>
  )
}




function ProductGridWapper(props) {
  return(
    <div className="grid-container">
      { props.products.map(product => <ProductCard key={product.id} product={product}/> )}
    </div>
  )
}

function ProductCard(props) {
  let numofItems = 0

  function Increment() {
    return numofItems++
  }

  return(
    <div className="product-card" onClick={Increment}>
      <div className="product-img">
        <img src={props.product.image} alt="product cover" loading="lazy"/>
      </div>
      <div className="product-info">
        <div className="main-info">
          <p>{props.product.name}</p>
          <p>{props.product.price}</p>
        </div>
      </div>
    </div>
  )
}