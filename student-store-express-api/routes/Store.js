const express = require("express")
const store = require("../models/store")
const { NotFoundError } = require("../utils/errors")
const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
      const products = await store.listProducts()
      res.status(200).json({ products })
    } catch (err) {
      next(err)
    }
})

router.get("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId
    const product = await store.fetchProductsById(productId)
    if (!product) {
      throw new NotFoundError(`Product ${productId} not found`)
    }
    res.status(200).json({ product })
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
    try {
      const user = req.body.user
      const shoppingCart = req.body.shoppingCart
      const newPurchase = await store.recordPurchase(user, shoppingCart)
      res.status(201).json({ "purchase": newPurchase })
    } catch (err) {
      next(err)
    }
})

module.exports = router