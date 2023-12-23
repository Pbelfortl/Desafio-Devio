import express from "express"
import cors from "cors"
import dishesRouter from "./routes/dishesRoute.js"
import ordersRouter from "./routes/ordersRoute.js"


const app = express()
app.use(express.json())
app.use(cors())
app.use(dishesRouter)
app.use(ordersRouter)

app.listen(4000, () => console.log("Running on port 4000"))