import express from 'express'
import fs from 'fs'
const app = express()
const port = process.env.port || 3000

app.listen(port, () => { console.log(`Aplication is running on port ${port}`); })

app.get("/")

app.post("/")

app.put("/")

app.delete("/")