const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    let queryText = `SELECT "name" from "ingredient"
                    JOIN "user_ingredient" on "ingredient".id = "user_ingredient".ingredient_id
                    WHERE "user_ingredient".user_id = $1;`;
    pool.query(queryText, [req.params.id]).then(result => {
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
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
