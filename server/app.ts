import express, {Express} from "express"
import path from "path"
import morgan from "morgan"
import mongoose, { Connection } from 'mongoose'
import dotenv from "dotenv"
import cors, {CorsOptions} from 'cors'
import bookRouter from "./src/routes/book"
import router from "./src/routes/index"

dotenv.config()

const app: Express = express()
const port: number = parseInt(process.env.PORT as string) || 1234

const mongoDB: string = "mongodb://127.0.0.1:27017/BooksDB"
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error"))
if (process.env.NODE_ENV === 'development') {
    const corsOptions: CorsOptions = {
        origin: 'http://localhost:1234',
        optionsSuccessStatus: 200
    }
    app.use(cors(corsOptions))
}

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))


app.use(express.static(path.join(__dirname, "../public", )))

app.use("/", router)
app.use("/api/book", bookRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)

})