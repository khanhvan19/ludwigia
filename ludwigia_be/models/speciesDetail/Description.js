const mongoose = require('mongoose');

const descriptionSchema = new mongoose.Schema({
    species_ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Species'
    },
    content: {
        type: String,
        required: true,
    },
    images: [{
        link: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        }
    }],
    deletedAt: Date,
}, { timestamps: true })

const Description = mongoose.model('Descriptions', descriptionSchema)

module.exports = Description;