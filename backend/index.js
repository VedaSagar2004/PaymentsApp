const express = require("express");
const rootRouter = require("./routes/index")
const cors = require("cors")
const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())
app.use("/api/v1", rootRouter)

app.listen(PORT)
console.log("server started")


