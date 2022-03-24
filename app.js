const express = require('express')
const methodOverride = require('method-override')
// const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')

const app = express()
const cors = require('cors')
const PORT = 3001

const db = require('./models')
const { Market, User, Watchlist } = db

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Home page displays all markets
app.get('/', (req, res) => {
  return Market.findAll({
    raw: true,
    nest: true
  })
    .then(markets => { res.send(markets) })
    .catch(err => console.log(err))
})

// add a market quote to home page
app.post('/market', (req, res) => {
  const { ticker, image, price, movement, change } = req.body.marketData
  const UserId = 1

  return Market.create({ ticker, image, price, movement, change, UserId })
    .then((response) => {
      res.json(response)
    })
    .catch(error => { console.log(error) })
})

// get watchlist
app.get('/watchlist', (req, res) => {
  const userId = req.query.userId

  return User.findAll({
    where: { id: userId },
    raw: true,
    nest: true,
    include: [
      { model: Market, as: 'WatchlistedMarkets' }
    ]
  })
    .then(markets => {
      const data = markets.map(market => market.WatchlistedMarkets)
      res.send(data)
    })
    .catch(err => console.log(err))
})

// add a market to watchlist
app.post('/watchlist', (req, res) => {
  const marketId = req.body.watchlistMarket.id
  const UserId = 1

  return Promise.all([
    Market.findByPk(marketId),
    Watchlist.findOne({
      where: {
        userId: UserId,
        marketId
      }
    })
  ])
    .then(([market, watchlist]) => {
      if (!market) throw new Error('Market does not exist!')
      if (watchlist) throw new Error("You have watchlisted this market already!")
      return Watchlist.create({
        userId: UserId,
        marketId: marketId
      })
        .then((response) => {
          res.json(response)
        })
        .catch(error => { console.log(error) })
    })
})

// remove a market from watchlist
app.delete('/watchlist', (req, res) => {
  const marketId = req.body.marketId
  const UserId = 1

  return Watchlist.findOne({
    where: {
      userId: UserId,
      marketId
    }
  })
    .then(watchlist => {
      if (!watchlist) throw new Error("You haven't watchlisted this market!")

      return watchlist.destroy()
    })
    .then((response) => {
      res.json(response)
    })
    .catch(error => { console.log(error) })
})



app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})