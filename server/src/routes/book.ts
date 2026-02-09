import { Request, Response, Router } from 'express'
import { Book, IBook } from "../models/Book"

const router: Router = Router()

interface BookData {
    name: string
    author: string
    pages: number
}

const books: BookData[] = []

router.post("/", async (req: Request, res: Response) => {
    
    try {
        const newBook = await Book.create({
            name: req.body.name,
            author: req.body.author,
            pages: req.body.pages
        })

        res.status(200).json("ok")
    } catch(error: any) {
        console.error(`Error during adding new book: ${error}`)
        return res.status(500).json({error: "Internal Server error"})
    }
})

router.get("/list", async (req: Request, res: Response) => {
    try {
        const books: IBook[] = await Book.find()
        return res.status(200).json(books)
    } catch (error: any) {
        console.log(`Error while fetching books ${error}`)
        return res.status(500).json({error: "Internal server error"})
    }
})

export default router