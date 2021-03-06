import {Request,Response} from 'express'
import knex from '../database/connection';

export default class PointsController {
    async create(request: Request,response: Response){
        const { name,email,whatsapp,latitude,longitude,city,uf,items} = request.body;

        const trx =  await knex.transaction();

        // Im using transcation so the point_items only get inserted if points get inserted;

        const point = {
            name,
            image:request.file.filename,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('points').insert(point);

        const pointItems = 
        items
        .split(',')
        .map((item: string )=> Number(item.trim()))
        .map((item_id: number) => {
            return {
                item_id,
                point_id: insertedIds[0],
            }
        });

        await trx('point_items').insert(pointItems);

        await trx.commit();

        return response.json({
            id:insertedIds[0],
            ...point,
        });
   
    };
    async show(request: Request, response: Response){
        const { id } = request.params;

        const point = await knex('points').where('id',id).first();

        if(!point) {
            return response.status(400).json({message: 'Point not found'});
        } else {
            const items = await knex('items')
            .join('point_items','items.id', '=' ,'point_items.item_id')
            .where('point_items.point_id',id)
            .select('items.title');


            return response.json({point,items});
        };
        
    };
    async index(request: Request,response: Response){
        const { city, uf, items } = request.query;

        const parsedItems = String(items).split(',').map(item => Number(item.trim()));

        const points = await knex('points')
        .join('point_items','points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id',parsedItems)
        .where('city',String(city))
        .where('uf',String(uf))
        .distinct()
        .select('points.*');

        return response.json(points);
    }
};
