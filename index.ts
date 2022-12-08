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
        if (err) res.send(err)
        else {
            let bookArr = [], found = [], getResponse: string
            bookArr = JSON.parse(data)

            for (let value of bookArr) {
                if (value['id'] == req.body['id'] || value['title'] == req.body['title']) {
                    found.push(value)
                }
            }

            getResponse = JSON.stringify(found)
            if (found.length > 0) res.status(200).send(getResponse)
            else res.status(400).send("Book not found!")
        }
    })
})

app.post("/")

app.put("/")

app.delete("/")