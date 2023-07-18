const mongoose = require('mongoose');

const speciesSchema = new mongoose.Schema({
    sci_name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    debut_year: Number,
    family_description: {
        type: String,
        required: true,
    },
    avatar: {
        link: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        }
    },
    other_name: [{
        name: {
            type: String,
            require: true
        },
        reference: Number
    }],
    vie_name: [{
        name: {
            type: String,
            require: true
        },
        reference: Number
    }],
    benefit: {
        type: String,
        required: true,
    },
    references: [{
        content: {
            type: String,
            require: true,
        },
        link: {
            type: String,
            require: true,
        },
        language: {
            type: String,
            require: true,
        },
    }],
    status: {
        type: Boolean,
        required: true,
    },
    genus_ref: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Genus'
    },
    deletedAt: Date,
}, { timestamps: true })

const Species = mongoose.model('Species', speciesSchema)

module.exports = Species;