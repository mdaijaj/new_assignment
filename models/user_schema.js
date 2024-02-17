const mongoose = require('../database/db');
const Schema = mongoose.Schema

var UserSchema = new Schema({
    username: {
        type: String,
    },
    mobile: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const UserDetail = mongoose.model('userdetail', UserSchema);
module.exports = UserDetail;