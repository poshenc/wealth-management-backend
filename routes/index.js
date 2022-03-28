const express = require('express')
const router = express.Router()

const marketController = require('../controllers/market-controller')

router.get('/', marketController.getMarkets)
router.post('/market', marketController.postMarket)
router.get('/watchlist', marketController.getWatchlists)
router.post('/watchlist', marketController.postWatchlist)
router.delete('/watchlist', marketController.deleteWatchlist)

module.exports = router