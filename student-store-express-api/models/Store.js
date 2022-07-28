const { BadRequestError } = require("../utils/errors")
const { storage } = require("../data/storage")

let purchase = {
  id: 0,
  name: "",
  email: "",
  cart: [],
  cost: 0
}

class store {
    static listProducts() {
      // list all items in the product array
      const products = storage.get("products").value()
      return products
    }

    static fetchProductsById(productId) {
        // fetch a single product
        const product = storage.get("products").find({ id: Number(productId) }).value()
        return product
      }

    static async recordPurchase(shoppingCart, user) {
      // create a new purchase
      let id = this.storage.get("purchases").value().length+1
      let name = ""
      let email = ""
      let cart = []
      let cost = 0

      if (!shoppingCart || !user) {
        throw new BadRequestError(`No order sent.`)
      }

      if (user.email && user.name) {
        name = user.name;
        email = user.email;
      } 
      else {
        throw new BadRequestError(`Enter email to make an order`)
      }

      shoppingCart.map((item, idx) => {
        if (item.itemId && item.quantity) {
          
          cart.push(item);
        } 
        else 
        {
          throw new BadRequestError();
        }
      })
      
      order.forEach((itemInCart) => {
        let product = this.fetchProductsById(itemInCart.itemId)
        cost = cost + product.price * itemInCart.quantity
      })

      cost = cost * 1.0875

      purchase = {
        id: id,
        name: name,
        email: email,
        cart: cart,
        cost: cost
      }

      storage
      .get("purchases")
      .push({purchase}).write()

      return purchase
    }
}

module.exports = store