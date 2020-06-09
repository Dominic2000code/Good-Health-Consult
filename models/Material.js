const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    materialCode: { type: String },
    materialName: { type: String },
    materialUnitPrice: { type: Number },
    materialStockLevel: { type: Number }
})

const Material = mongoose.model('Material', materialSchema);

module.exports = { Material }