const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const { NotFoundError } = require("./utils/errors")
const storeRouter = require("./routes/Store")

const app = express()

app.use(morgan("tiny"))
app.use(express.json())
app.use(cors())

app.use("/store", storeRouter)

app.get("/", async (req, res) => {
    res.status(200).json({ping: "pong"})
})

app.use((req, res, next) => {
    return next(new NotFoundError())
})


app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message || "Something went wrong."
    return res.status(status).json({
      error: { status, message }
    })
})

module.exports = app