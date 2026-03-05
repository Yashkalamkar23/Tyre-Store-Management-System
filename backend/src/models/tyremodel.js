import mongoose from "mongoose";
const tyreSchema = new mongoose.Schema({
    recordId:{
        type: Number,
        required: true
    },
    invoiceNumber:{
        type: String,
        required: true
    },
    customerMobile:{
        type: String,
        required: true
    },
    customerName:{
        type: String,
        required: true
    },
    vehicleType:{
        type: String,
        required: true
    },
    tyreBrand:{
        type: String,
        required: true
    },
    tyreType:{
        type: String,
        required: true
    },
    unitPrice:{
        type: Number,
        required: true
    },
},{timestamps: true});
const Tyre = mongoose.model("Tyre", tyreSchema);

export default Tyre;