const Foe = require('../model/Foe')

async function getAllFoes(req, res){
    try {
        const foundFoes = await Foe.find({})
        res.json({message: "Foes found.", payload: foundFoes})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function getFoeByID(req, res){
    try {
        const foundFoe = await Foe.findOne({_id: req.params.id})
        res.json({message: "Foe found.", payload: foundFoe})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function createFoe(req, res){
    try {
        const newFoe = new Foe({...req.body
        })
        const savedFoe = await newFoe.save()
        const updatedFoes = await Foe.find({})
        res.json({message: "Foe created.", payload1: savedFoe, payload2: updatedFoes})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function updateFoeByID(req, res){
    try {
        const updatedFoe = await Foe.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
        const updatedFoes = await Foe.find({})
        res.json({message: "Foe updated.", payload1: updatedFoe, payload2: updatedFoes})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function deleteFoeByID(req, res){
    try {
        const deletedFoe = await Foe.findByIdAndDelete(req.params.id)
        const updatedFoes = await Foe.find({})
        res.json({message: "Foe deleted.", payload1: deletedFoe, payload2: updatedFoes})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

module.exports = {
    getAllFoes,
    getFoeByID,
    createFoe,
    updateFoeByID,
    deleteFoeByID
}