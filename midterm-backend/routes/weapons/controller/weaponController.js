const Weapon = require('../model/Weapon')

async function getAllWeapons(req, res){
    try {
        const foundWeapons = await Weapon.find({})
        res.json({message: "Weapons found.", payload: foundWeapons})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function getWeaponByID(req, res){
    try {
        const foundWeapon = await Weapon.findOne({_id: req.params.id})
        res.json({message: "Weapon found.", payload: foundWeapon})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function createWeapon(req, res){
    try {
        const newWeapon = new Weapon({...req.body
        })
        const savedWeapon = await newWeapon.save()
        const updatedWeapons = await Weapon.find({})
        res.json({message: "Weapon created.", payload1: savedWeapon, payload2: updatedWeapons})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function updateWeaponByID(req, res){
    try {
        const updatedWeapon = await Weapon.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
        const updatedWeapons = await Weapon.find({})
        res.json({message: "Weapon updated.", payload1: updatedWeapon, payload2: updatedWeapons})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function deleteWeaponByID(req, res){
    try {
        const deletedWeapon = await Weapon.findByIdAndDelete(req.params.id)
        const updatedWeapons = await Weapon.find({})
        res.json({message: "Weapon deleted.", payload1: deletedWeapon, payload2: updatedWeapons})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

module.exports = {
    getAllWeapons,
    getWeaponByID,
    createWeapon,
    updateWeaponByID,
    deleteWeaponByID
}