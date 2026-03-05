import Tyre from "../models/tyremodel.js";
export async function getAllTyres(_, res) {
    try {
        const tyres= await Tyre.find().sort({createdAt: -1});
        res.status(200).json(tyres);
    }catch(error) {
        console.error("Error in getAllTyres Controllers", error)
        res.status(500).json({message: "Internal server error"})
    }
}
export async function getTyreById(req, res) {
    try {
    const tyres=await Tyre.findById(req.params.id)
    if(!tyres) return res.status(404).json({message: "Tyre not found"})
        res.status(200).json(tyres)
    }catch(error) {
        console.error("Error in getTyreById Controllers", error)
        res.status(500).json({message: "Internal server error"})
    }
}
export async function createTyre(req, res){
    try {
        const {recordId, invoiceNumber, customerMobile, customerName, vehicleType, tyreBrand, tyreType, unitPrice} = req.body
        if(! recordId || !invoiceNumber || !customerMobile || !customerName || !vehicleType || !tyreBrand || !tyreType || !unitPrice) {
            return res.status(400).json({message: "All fields are required"})
        }
        const tyres= new Tyre({recordId, invoiceNumber, customerMobile, customerName, vehicleType, tyreBrand, tyreType, unitPrice})
        const savedTyre = await tyres.save() 
        res.status(201).json({savedTyre})
    }catch(error) {
        console.error("Error in createTyre Controllers:", error)
        res.status(500).json({message: "Internal server error"})
    }
}
export async function updateTyre(req, res) {
    try {
        const {recordId, invoiceNumber, customerMobile, customerName, vehicleType, tyreBrand, tyreType, unitPrice} = req.body
        const updatedTyre=await Tyre.findByIdAndUpdate(req.params.id, {recordId, invoiceNumber, customerMobile, customerName, vehicleType, tyreBrand, tyreType, unitPrice}, {new: true})
        if(!updatedTyre) return res.status(404).json({message: "Tyre not found"})
        res.status(200).json(updatedTyre)
    }catch(error) {
        console.error("Error in updateTyre Controllers:", error)
        res.status(500).json({message: "Internal server error"})
    }
}
export async function deleteTyre(req, res) {
    try {
        const deletedTyre=await Tyre.findByIdAndDelete(req.params.id)
        if(!deletedTyre) return res.status(404).json({message: "Tyre not found"})
            res.status(200).json({message: "Tyre Deleted successfully"})
    }catch(error) {
        console.error("Error in deleteTyre Controllers:", error)
        res.status(500).json({message: "Internal server error"})
    }
}

