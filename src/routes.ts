import { Router } from 'express';
import multer from 'multer';

import multerconfig from './config/multer';
import PointsController from './controllers/PointsController';
const pointsContoller = new PointsController();

import ItemsController from './controllers/ItemsController';
const itemsContoller = new ItemsController();


const routes = Router();
const upload = multer(multerconfig);

routes.get('/items',itemsContoller.index);
routes.get('/points/:id',pointsContoller.show);
routes.get('/points',pointsContoller.index);

routes.post('/points',upload.single('image'),pointsContoller.create);

export default routes;