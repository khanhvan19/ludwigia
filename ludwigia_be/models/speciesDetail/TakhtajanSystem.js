const mongoose = require('mongoose');

const TakhtajanSystemSchema = new mongoose.Schema({
    species_ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Species'
    },
    kingdom: {
        name: {
            type: String,
            required: true,
        },
        nomenclature: {
            type: String,
            required: true,
        },
        reference: Number,
    },
    division: {
        name: {
            type: String,
            required: true,
        },
        nomenclature: {
            type: String,
            required: true,
        },
        reference: Number,
    },
    class: {
        name: {
            type: String,
            required: true,
        },
        nomenclature: {
            type: String,
            required: true,
        },
        reference: Number,
    },
    order: {
        name: {
            type: String,
            required: true,
        },
        nomenclature: {
            type: String,
            required: true,
        },
        reference: Number,
    },
    family: {
        name: {
            type: String,
            required: true,
        },
        nomenclature: {
            type: String,
            required: true,
        },
        description: String,
        reference: Number,
    },
    genus: {
        name: {
            type: String,
            required: true,
        },
        nomenclature: {
            type: String,
            required: true,
        },
        reference: Number,
    },
    species: {
        name: {
            type: String,
            required: true,
        },
        nomenclature: {
            type: String,
            required: true,
        },
        reference: Number,
    },
    deletedAt: Date,
}, { timestamps: true })

const TakhtajanSystem = mongoose.model('TakhtajanSystem', TakhtajanSystemSchema)

module.exports = TakhtajanSystem;