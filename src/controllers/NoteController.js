import mongoose from "mongoose";
import moment from "moment";
import { NoteModel } from "../models";
import { createNote, updateNote } from '../validations';
import req from "express/lib/request";

export async function getAll(req, res) {
    let result = {
        success: false,
        message: null,
        data: null
    }

    try {
        const notes = await NoteModel.find().populate('user').exec();

        result.success = true;
        result.data = notes;
    } catch(error) {
        console.error(error);

        result.message = error;
    }

    res.json(result);
}

export async function getOne(req, res) {
    let result = {
        success: false,
        message: null,
        data: null
    }

    try {
        const note = await NoteModel.findOne({ _id: req.params.id}).exec();

        result.success = true;
        result.data = note;
    } catch(error) {
        if(error instanceof Error) {
            result.message = error.message;
        } else {
            console.error(error);

            return;
        }
    }

    res.json(result);
}

export async function create(req, res) {
    let result = {
        success: false,
        message: null,
        data: null
    }

    try {
        const { error } = createNote(req.body);
        if(error) throw new Error(error.details[0].message);
        
        const note = await NoteModel.create({
            title: req.body.title,
            content: req.body.content,
            user: req.userId
        });

        result.success = true;
        result.message = 'Note created';
        result.data = note;
    } catch(error) {
        if(error instanceof Error) {
            result.message = error.message;
        } else {
            console.error(error);

            return;
        }
    }

    res.json(result);
}

export async function update(req, res) {
    let result = {
        success: false,
        message: null,
        data: null
    }

    try {
        const { error } = updateNote(req.body);
        if(error) throw new Error(error.details[0].message);

        const note = await NoteModel.findById(req.body.id).populate('user').exec();

        if(!note) throw new Error('Note not found!');
        if(note.user._id != req.userId) throw new Error(`You dont't have access to delete others note`);
        
        await NoteModel.updateOne({ _id: mongoose.Types.ObjectId(req.body.id)}, {
            updated: moment.utc(),
            title: req.body.title,
            content: req.body.content
        });
        
        const noteUpdated = await NoteModel.findById(req.body.id).populate('user').exec();

        result.success = true;
        result.data = noteUpdated;
    } catch(error) {
        if(error instanceof Error) {
            result.message = error.message;
        } else {
            console.error(error);

            return;
        }
    }

    res.json(result);
}

export async function deleteOne(req, res) {
    let result = {
        success: false,
        message: null,
        data: null
    }

    try {
        const note = await NoteModel.findById(req.params.id).populate('user').exec();

        if(!note) throw new Error('Note not found!');
        if(note.user._id != req.userId) throw new Error(`You dont't have access to delete others note`);

        const noteDelete = await NoteModel.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) });

        result.success = true;
        result.data = noteDelete;
    } catch(error) {
        if(error instanceof Error) {
            result.message = error.message;
        } else {
            console.error(error);

            return;
        }
    }

    res.json(result);
}
