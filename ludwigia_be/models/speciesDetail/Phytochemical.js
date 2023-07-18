const mongoose = require('mongoose');

const PhytochemicalSchema = new mongoose.Schema({
    species_ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Species'
    },
    bio_active: {
        type: String,
        required: true,
        trim: true,
    },
    reference: {
        type: Number,
        required: true,
    },
    chemical_group: {
        type: String,   
        trim: true,
    },
    segment: {
        type: String,
        trim: true,
    },
    physical_properties: {
        type: String,
        required: true,
    },
    spectrum: {
        type: Array,
        required: true,
    },
    chemical_structure: {
        image_link: {
            type: String,
            required: true,
        },
        image_path: {
            type: String,
            required: true,
        }
    },
    pharma_effect: {
        type: String,
        trim: true,
    },
    deletedAt: Date,
}, { timestamps: true })

const Phytochemical = mongoose.model('Phytochemicals', PhytochemicalSchema)

module.exports = Phytochemical;