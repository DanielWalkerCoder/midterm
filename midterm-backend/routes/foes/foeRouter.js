const express = require('express')
const router = express.Router()

const {
    getAllFoes,
    getFoeByID,
    createFoe,
    updateFoeByID,
    deleteFoeByID
} = require ('./controller/foeController')

router.get('/get-all-foes', getAllFoes)
router.get('/get-foe-by-id/:id', getFoeByID)
router.post('/create-foe', createFoe)
router.put('/update-foe-by-id/:id', updateFoeByID)
router.delete('/delete-foe-by-id/:id', deleteFoeByID)

module.exports = router