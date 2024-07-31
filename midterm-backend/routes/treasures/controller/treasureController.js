const Treasure = require('../model/Treasure')

async function getAllTreasures(req, res){
    try {
        const foundTreasures = await Treasure.find({})
        res.json({message: "Treasures found.", payload: foundTreasures})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function getTreasureByID(req, res){
    try {
        const foundTreasure = await Treasure.findOne({_id: req.params.id})
        res.json({message: "Treasure found.", payload: foundTreasure})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function createTreasure(req, res){
    try {
        const newTreasure = new Treasure({...req.body
        })
        const savedTreasure = await newTreasure.save()
        const updatedTreasures = await Treasure.find({})
        res.json({message: "Treasure created.", payload1: savedTreasure, payload2: updatedTreasures})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function updateTreasureByID(req, res){
    try {
        const updatedTreasure = await Treasure.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
        const updatedTreasures = await Treasure.find({})
        res.json({message: "Treasure updated.", payload1: updatedTreasure, payload2: updatedTreasures})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function deleteTreasureByID(req, res){
    try {
        const deletedTreasure = await Treasure.findByIdAndDelete(req.params.id)
        const updatedTreasures = await Treasure.find({})
        res.json({message: "Treasure deleted.", payload1: deletedTreasure, payload2: updatedTreasures})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

module.exports = {
    getAllTreasures,
    getTreasureByID,
    createTreasure,
    updateTreasureByID,
    deleteTreasureByID
}