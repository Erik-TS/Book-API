import express from 'express'
import fs from 'fs'

const app = express()
const port = process.env.port || 3000
const encoding = "utf-8"
const filePath = "./books.json"

app.listen(port, () => { console.log(`Aplication is running on port ${port}`); })
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) res.status(500).send(err)
        else {
            let bookList: Array<{ id: number, title: string }>, foundBook: Array<{ id: number, title: string }>, getResponse: string
            bookList = JSON.parse(data), foundBook = []

            for (let value of bookList) {
                if (value['id'] == req.body['id'] || value['title'] == req.body['title']) {
                    foundBook.push(value)
                }
            }

            getResponse = JSON.stringify(foundBook)
            if (foundBook.length > 0) res.status(200).send(getResponse)
            else res.status(404).send("Book not found!")
        }
    })
})

app.post("/", (req, res) => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) res.status(500).send(err)
        else {
            let bookList: Array<{ id: number, title: string }> = JSON.parse(data)
            let newBook: { id: any, title: string } = req.body, booksJSON: string

            newBook.id = parseInt(newBook.id)
            bookList = bookList.concat(newBook)
            booksJSON = JSON.stringify(bookList)

            fs.writeFile(filePath, booksJSON, encoding, (err) => {
                if (err) res.status(500).send(err)
                else res.status(201).send("The book was added.")
            })
        }
    })
})

app.put("/", (req, res) => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) res.status(500).send(err)
        else {
            const updatedBook: { id: string, title: string } = req.body
            let bookList: Array<{ id: number, title: string }> = JSON.parse(data)

            for (let value of bookList) {
                if (parseInt(updatedBook.id) === value.id) {
                    value.id = parseInt(updatedBook.id)
                    value.title = updatedBook.title
                }
            }

            let booksJSON = JSON.stringify(bookList)
            fs.writeFile(filePath, booksJSON, encoding, (err) => {
                if (err) res.status(500).send(err)
                else res.status(200).send("Book updated.")
            })
        }
    })
})

app.delete("/", (req, res) => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) res.status(500).send(err)
        else {
            let booksJSON: string
            let bookList: Array<{ id: number, title: string }> = JSON.parse(data)
            let deletedBook: { id: any, title: string } = req.body
            deletedBook.id = parseInt(deletedBook.id)

            for (let i = 0; i < bookList.length; i++) {
                if (bookList[i].id === deletedBook.id) bookList.splice(i, 1)
            }

            booksJSON = JSON.stringify(bookList)
            fs.writeFile(filePath, booksJSON, encoding, (err) => {
                if (err) res.status(500).send(err)
                else res.status(200).send("The book was deleted.")
            })
        }
    })
})