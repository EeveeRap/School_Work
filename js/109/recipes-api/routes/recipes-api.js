const express = require('express');
const debug = require('debug')('contacts-api:contacts-api');
const pool = require('../connectionPool.js');

const router = express.Router();

router.route('/')
    //Getting all recipes
    .get(async (req, res, next) => {
        try {
            const [results] = await pool.query(
                'SELECT * FROM recipes');
            res.send(results);
        } catch(err){
            return next(err);
        }
    })

    //Adding one recipe
    .post(async (req, res, next) => {
        const { recipe_name, url, ingredients } = req.body;
        try{
            const [results] = await pool.execute(
                'INSERT INTO recipes (recipe_name, url, ingredients) VALUES(?,?,?)', [recipe_name, url, ingredients]
            );
            req.body.id = results.insertId;

            res.status(201)
               .location(`/recipe-api/${req.body.id}`)
               .send(req.body); 
        }catch(err){
            return next(err);
        }
    });

    router.route('/:id')
    //getting a recipe
    .get(async(req, res, next) =>{
        try{
            const [results] = await pool.query(
                'SELECT * FROM recipes WHERE id = ?', [req.params.id]
            );
            if(!results.length){
                return res.status(404)
                          .send(`Couldn't find a recipe with an ID of ${req.params.id}`);
            }
            res.send(results[0]);
        }catch(err){
            return next(err);
        }
    })

    //Updating a recipe
    .put(async(req, res, next) => {
        const { recipe_name, url, ingredients } = req.body;

        try{
            const [results] = await pool.query(
                `UPDATE recipes
                 SET recipe_name = ?, url = ?, ingredients = ?
                 WHERE id = ?`, [recipe_name, url, ingredients, req.params.id]
            );
            if(!affectedRows){
                return res.status(404)
                          .end(`Unable to update the recipe with an id of ${req.params.id}`)
            }
            res.status(204);
        } catch(err){
            return next(err);
        }
    })

    //Deleting a recipe
    .delete(async (req, res, next) =>{
        try{
            const [results] = await pool.query(
                'DELETE FROM recipes WHERE id = ?', [req.params.id]
            );
            if(!results.affectedRows){
                return res.status(404)
                          .end(`Unable to delete the recipe with an id of ${req.params.id}`);
            }
            res.sendStatus(204);
        } catch(err){
            return next(err);
        }
    });

    router.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.end(err.message || 'Internal server error...');
    });
    
    module.exports = router;
