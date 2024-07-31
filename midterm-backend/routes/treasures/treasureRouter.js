const express = require('express')
const router = express.Router()

const {
    getAllTreasures,
    getTreasureByID,
    createTreasure,
    updateTreasureByID,
    deleteTreasureByID
} = require ('./controller/treasureController')

router.get('/get-all-treasures', getAllTreasures)
router.get('/get-treasure-by-id/:id', getTreasureByID)
router.post('/create-treasure', createTreasure)
router.put('/update-treasure-by-id/:id', updateTreasureByID)
router.delete('/delete-treasure-by-id/:id', deleteTreasureByID)

module.exports = router