const mongoose = require('mongoose');

const MicrosurgerySchema = new mongoose.Schema({
    species_ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Species'
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
    caption: {
        type: String,
        require: true,
    },
    explains: {
        type: Array,
        require: true,
    },
    deletedAt: Date,
}, { timestamps: true })

const Microsurgery = mongoose.model('Microsurgerys', MicrosurgerySchema)

module.exports = Microsurgery;