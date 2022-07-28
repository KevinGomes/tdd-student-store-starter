import { useEffect } from "react"
import "./ShoppingCart.css"

export default function ShoppingCart(props) {
    console.log(props.shoppingCart)

    let cartArr = [{}]
    props.shoppingCart.map((e, index) => {
      if (e.amount > 0) {
        cartArr.push({ itemId: e.itemId, amount: e.amount })
      }
    })
    console.log(cartArr)
    //Used cartArr to get specific item
    function getItem(num) {
      let item = {};
      props.products.map((e, index) => {
        if (e.id === num && e != undefined) {
          item = e;
        }
      });
      return item;
    }
  
    //Gets total in shopping cart
    let total = 0;
    
    function getTotal() {
      props.shoppingCart.map((e, index) => {
        if (e.itemId === "" || e.amount === 0) {
          return;
        } else {
          let temp = getItem(e.itemId);
          total += temp.price * e.amount;
        }
      });
    }

    getTotal()
  
    return (
      <div className="shopping-cart">
        <div className="cart">
          <div className="name">
            <h3>Name</h3>
            {cartArr.map((e, index) => {
              let item = getItem(e.itemId);
              return <h5 className="cart-product-name">{item.name}</h5>;
            })}
          </div>
          <div className="Quantity">
            <h3>Quantity</h3>
            {cartArr.map((e, index) => {
              let item = getItem(e.itemId);
              return <h5 className="cart-product-quantity">{e.amount}</h5>;
            })}
          </div>
          <div className="price">
            <h3>Price</h3>
            {cartArr.map((e, index) => {
              let item = getItem(e.itemId);
              return <h5 className="item">{item.price}</h5>;
            })}
          </div>
      </div>
      <div className="total">
            <h3 className="subtotal">Subtotal</h3>
            <h2 className="subtotal">${total.toFixed(2)}</h2>
          </div>
        </div>
    );
  }