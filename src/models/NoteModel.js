import mongoose from 'mongoose';
import moment from 'moment';

const NoteSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: () => moment.utc()
    },
    updated: {
        type: Date,
        default: null
    },
    title : {
        type: String,
        default: null
    },
    content: {
        type: String,
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const NoteModel = mongoose.model('Note', NoteSchema);

export default NoteModel;
