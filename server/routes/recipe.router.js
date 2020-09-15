const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET All recipes by all users
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "recipe" ORDER BY "id" DESC;';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting recipes', error);
        res.sendStatus(500);
    });
})

// GET only the user's favorite recipes
router.get('/favorites', (req, res) => {
    let queryText = `SELECT "favorites".user_id, "recipe_id", "recipe".name FROM "favorites" 
                    JOIN "recipe" on "favorites".recipe_id = "recipe".id
                    WHERE "favorites".user_id = $1;`;
    pool.query(queryText, [req.user.id]).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting favorites', error);
        res.sendStatus(500);
    });
})

// POST a new recipe 
router.post('/', (req, res) => {
    console.log('Adding new recipe:', req.body);
    let queryText = `INSERT INTO "recipe" ("name", "image", "description", "instructions")
                     VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [req.body.name, req.body.image, req.body.description, req.body.instructions])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log(`Error adding recipe`, error); 
        res.sendStatus(500);
    });
});

// POST a new favorite recipe for the user
router.post('/favorites', (req, res) => {
    console.log('Adding new favorite:', req.body);
    let queryText = `INSERT INTO "favorites" ("user_id", "recipe_id")
                     VALUES ($1, $2);`;
    pool.query(queryText, [req.user.id, req.body.id])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log(`Error adding favorite`, error); 
        res.sendStatus(500);
    });
});

module.exports = router;
