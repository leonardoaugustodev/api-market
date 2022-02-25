import express from 'express'
import nightmare from 'nightmare'

const web = nightmare({ show: true })

import { getPrice } from './scrap.js'

const app = express()
const port = 3000

app.get('/api/market-data/:ticker', async (req, res) => {
  const price = await getPrice(req.params.ticker);
  res.json(price)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

