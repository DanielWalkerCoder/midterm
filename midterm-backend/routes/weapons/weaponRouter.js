const express = require('express')
const router = express.Router()

const {
    getAllWeapons,
    getWeaponByID,
    createWeapon,
    updateWeaponByID,
    deleteWeaponByID
} = require ('./controller/weaponController')

router.get('/get-all-weapons', getAllWeapons)
router.get('/get-weapon-by-id/:id', getWeaponByID)
router.post('/create-weapon', createWeapon)
router.put('/update-weapon-by-id/:id', updateWeaponByID)
router.delete('/delete-weapon-by-id/:id', deleteWeaponByID)

module.exports = router