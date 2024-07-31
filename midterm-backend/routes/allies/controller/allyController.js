const Ally = require('../model/Ally')

async function getAllAllies(req, res){
    try {
        const foundAllies = await Ally.find({})
        res.json({message: "Allies found.", payload: foundAllies})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function getAllyByID(req, res){
    try {
        const foundAlly = await Ally.findOne({_id: req.params.id})
        res.json({message: "Ally found.", payload: foundAlly})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function createAlly(req, res){
    try {
        const newAlly = new Ally({...req.body
        })
        const savedAlly = await newAlly.save()
        const updatedAllies = await Ally.find({})
        res.json({message: "Ally created.", payload1: savedAlly, payload2: updatedAllies})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function updateAllyByID(req, res){
    try {
        const updatedAlly = await Ally.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
        const updatedAllies = await Ally.find({})
        res.json({message: "Ally updated.", payload1: updatedAlly, payload2: updatedAllies})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

async function deleteAllyByID(req, res){
    try {
        const deletedAlly = await Ally.findByIdAndDelete(req.params.id)
        const updatedAllies = await Ally.find({})
        res.json({message: "Ally deleted.", payload1: deletedAlly, payload2: updatedAllies})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

module.exports = {
    getAllAllies,
    getAllyByID,
    createAlly,
    updateAllyByID,
    deleteAllyByID
}