const express = require('express')
const router = express.Router()

const {
    getAllAllies,
    getAllyByID,
    createAlly,
    updateAllyByID,
    deleteAllyByID
} = require ('./controller/allyController')

router.get('/get-all-allies', getAllAllies)
router.get('/get-ally-by-id/:id', getAllyByID)
router.post('/create-ally', createAlly)
router.put('/update-ally-by-id/:id', updateAllyByID)
router.delete('/delete-ally-by-id/:id', deleteAllyByID)

module.exports = router