const { Market, User, Watchlist } = require('../models')

const marketController = {
  // Home page displays all markets
  getMarkets: (req, res) => {
    return Market.findAll({
      raw: true,
      nest: true
    })
      .then(markets => { res.send(markets) })
      .catch(err => console.log(err))
  },

  // add a market quote to home page
  postMarket: (req, res) => {
    const { ticker, image, price, movement, change } = req.body.marketData
    const UserId = 1

    return Market.create({ ticker, image, price, movement, change, UserId })
      .then((response) => {
        res.json(response)
      })
      .catch(error => { console.log(error) })
  },

  // get watchlist
  getWatchlists: (req, res) => {
    console.log(req.query)
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
  },

  // add a market to watchlist
  postWatchlist: (req, res) => {
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
  },

  // remove a market from watchlist
  deleteWatchlist: (req, res) => {
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
  }

}
module.exports = marketController
