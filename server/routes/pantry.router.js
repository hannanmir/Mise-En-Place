const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route, uses the user id to get all ingredients associated with that user
router.get('/', (req, res) => {
    let queryText = `SELECT "name", "quantity", "inFridge" from "ingredient"
                    JOIN "user_ingredient" on "ingredient".id = "user_ingredient".ingredient_id
                    WHERE "user_ingredient".user_id = $1;`;
    pool.query(queryText, [req.user.id]).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting pantry', error);
        res.sendStatus(500);
    });
})

/**
 * POST route template
 */
router.post('/', async (req, res) => {
    console.log('Adding new ingredient:', req.body);
    const client = await pool.connect();
    try {
        const firstQuery = `INSERT INTO "ingredient" ("name")
                            VALUES ($1) RETURNING "id";`;
        const secondQuery = `INSERT INTO "user_ingredient" ("user_id", "ingredient_id", "quantity", "inFridge")
                            VALUES ($1, $2, $3, $4);`;
        await client.query('BEGIN');
        const result = await client.query(firstQuery, [req.body.name])
        await client.query(secondQuery, [req.user.id, result.rows[0].id, req.body.quantity, req.body.inFridge])
        await client.query('COMMIT');
        res.sendStatus(201)
    }  catch (error) {
        console.log(error);
        await client.query('ROLLBACK')
        res.sendStatus(500)
      } finally {
        await client.release();
      }
});

module.exports = router;
