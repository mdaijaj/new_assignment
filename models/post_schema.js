const mongoose = require('../database/db');
const Schema = mongoose.Schema;

var resource_schema = new Schema({
    resource_name: {
        type: String,
        maxlength: [30, "resource_name cannot exceed 30 charactor"],
        min: [4, "resource_name should be more than 4 charactor"],
        unique: true
    },
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        maxlength: [50, "description cannot exceed 50 charactor"],
    },
    price: {
        type: Number,
        trim: true
    },
    status: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
});

const Resourse = mongoose.model('Resourse', resource_schema);
module.exports = Resourse;