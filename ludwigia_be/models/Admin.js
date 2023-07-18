const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        link: String,
        path: String,
    },
    status: {
        type: Boolean,
        required: true
    },
}, { timestamps: true })

adminSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        if(err) return next(err);
        else {
            this.password = hash;
            next();
        } 
    });
})

const Admin = mongoose.model('Admins', adminSchema)

module.exports = Admin;