const mongoose = require('mongoose');

const distributionSchema = new mongoose.Schema({
    species_ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Species'
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        link: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        }
    },
    deletedAt: Date,
}, { timestamps: true })

const Distribution = mongoose.model('Distributions', distributionSchema)

module.exports = Distribution;