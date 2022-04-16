import { UserModel } from "../models";
import moment from "moment";

export async function getAll () {
    let result = {
        success: false,
        message: null,
        data: null
    }

    try {
        const users = await UserModel.find().exec();

        result.success = true;
        result.data = users;
    } catch(error) {
        console.error(error);

        result.message = error;
    }

    return result;
}

export async function getOne () {
    let result = {
        success: false,
        message: null,
        data: null
    }

    try {
        const user = await UserModel.findOne({ _id: id}).exec();

        result.success = true;
        result.data = user;
    } catch(error) {
        console.error(error);

        result.message = error;
    }

    return result;
}

export async function create (data) {
    let result = {
        success: false,
        message: null,
        data: null
    }

    try {
        const user = await UserModel.create({
            name: data.name,
            email: data.email,
            password: data.password
        });

        result.success = true;
        result.message = 'User created';
        result.data = user;
    } catch(error) {
        console.error(error);
        
        result.success = false;
        result.message = error;
    }

    return result;
}

export async function update  (data) {
    let result = {
        success: false,
        message: null,
        data: null
    }

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(data.password, salt);

        const user = await UserModel.updateOne({
            updated: moment.utc(),
            name: data.name,
            email: data.email,
            password: hashedPassword
        });

        result.success = true;
        result.data = user;
    } catch(error) {
        console.error(error);

        result.message = error;
    }

    return result;
}

export async function deleteOne(id) {
    let result = {
        success: false,
        message: null,
        data: null
    }

    try {
        const user = await UserModel.deleteOne({ _id: id })

        result.success = true;
        result.data = user;
    } catch(error) {
        console.error(error);

        result.message = error;
    }

    return result;
}
