import mongoose from 'mongoose';
import moment from 'moment';

const UserSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: () => moment.utc()
    },
    updated: {
        type: Date,
        default: null
    },
    name: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    note: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
