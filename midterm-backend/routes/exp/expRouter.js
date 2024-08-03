const express = require('express')
const router = express.Router()

const {
    // getAllExp,
    getExpByID,
    // createExp,
    updateExpByID
} = require ('./controller/expController')

// router.get('/get-all-exp', getAllExp)
router.get('/get-exp-by-id/:id', getExpByID)
// router.post('/create-exp', createExp)
router.put('/update-exp-by-id/:id', updateExpByID)
//id is 66a91d01fa43f8e15c09eb78

module.exports = router