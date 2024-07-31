const Exp = require('../model/Exp')

// async function getAllExp(req, res){
//     try {
//         const foundExp = await Exp.find({})
//         res.json({message: "Exp found.", payload: foundExp})
//     } catch (error) {
//         res.status(500).json({message: "Error", error: error})
//     }
// }

async function getExpByID(req, res){
    try {
        const foundExp = await Exp.findOne({_id: req.params.id})
        res.json({message: "Exp found.", payload: foundExp})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

// async function createExp(req, res){
//     try {
//         const newExp = new Exp({...req.body
//         })
//         const savedExp = await newExp.save()
//         res.json({message: "Exp created.", payload: savedExp})
//     } catch (error) {
//         res.status(500).json({message: "Error", error: error})
//     }
// }

async function updateExpByID(req, res){
    try {
        const updatedExp = await Exp.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
        res.json({message: "Exp updated.", payload: updatedExp})
    } catch (error) {
        res.status(500).json({message: "Error", error: error})
    }
}

module.exports = {
    // getAllExp,
    getExpByID,
    // createExp,
    updateExpByID,
}