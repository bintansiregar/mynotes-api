import { Router } from 'express';
import * as Note from '../controllers/NoteController';
import { authenticateUser } from '../helper';

const noteRoute = Router();

noteRoute.get('/', authenticateUser, Note.getAll);
noteRoute.get('/:id', authenticateUser, Note.getOne);
noteRoute.post('/',authenticateUser, Note.create);
noteRoute.patch('/',authenticateUser, Note.update);
noteRoute.delete('/:id', authenticateUser, Note.deleteOne);

export default noteRoute;
