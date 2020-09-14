const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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

module.exports = router;
