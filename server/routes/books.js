import express from 'express'
import path from 'path'

import { fileURLToPath } from 'url'

import bookData from '../data/books.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json(bookData)
})

router.get('/:bookId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/book.html'))
})

export default router