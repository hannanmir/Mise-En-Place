const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route, uses the user id to get all ingredients associated with that user
router.get('/', (req, res) => {
    let queryText = `SELECT "user_ingredient".ingredient_id, "name", "quantity" from "ingredient"
                    JOIN "user_ingredient" on "ingredient".id = "user_ingredient".ingredient_id
                    WHERE "user_ingredient".user_id = $1 AND "inFridge" = false
                    ORDER BY "name";`;
    pool.query(queryText, [req.user.id]).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting pantry', error);
        res.sendStatus(500);
    });
})

// GET the ingredients in the fridge for the user
router.get('/fridge', (req, res) => {
    let queryText = `SELECT "user_ingredient".ingredient_id, "name", "quantity" from "ingredient"
                    JOIN "user_ingredient" on "ingredient".id = "user_ingredient".ingredient_id
                    WHERE "user_ingredient".user_id = $1 AND "inFridge" = true
                    ORDER BY "name";`;
    pool.query(queryText, [req.user.id]).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting fridge', error);
        res.sendStatus(500);
    });
})

// GET recipe ingredients 
router.get('/recipe/:id', (req, res) => {
    let queryText = `SELECT "ingredient_id", "quantity", "inFridge", "ingredient".name from "ingredient_recipe"
                    JOIN "ingredient" on "ingredient_recipe".ingredient_id = "ingredient".id
                    WHERE "recipe_id" = $1;`;
    pool.query(queryText, [req.params.id]).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting recipe ingredients', error);
        res.sendStatus(500);
    });
})

// POST recipe ingredients
router.post('/recipe', async (req, res) => {
    console.log('Adding new recipe ingredient:', req.body);
    const client = await pool.connect();
    try {
        const firstQuery = `INSERT INTO "ingredient" ("name")
                            VALUES ($1) RETURNING "id";`;
        const secondQuery = `INSERT INTO "ingredient_recipe" ("recipe_id", "ingredient_id", "quantity", "inFridge")
                            VALUES ($1, $2, $3, $4);`;
        await client.query('BEGIN');
        const result = await client.query(firstQuery, [req.body.name])
        await client.query(secondQuery, [req.body.recipe_id, result.rows[0].id, req.body.quantity, req.body.inFridge])
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


// POST new ingredient for the user
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

// DELETE a ingredient for the user
router.delete('/:id', async (req, res) => {
    console.log('In Delete:', req.params.id);
    const client = await pool.connect();
    try {
        const firstQuery = `DELETE FROM "user_ingredient"
                            WHERE "ingredient_id" = $1;`;
        const secondQuery = `DELETE FROM "ingredient"
                             WHERE "id" = $1;`;
        await client.query('BEGIN');
        await client.query(firstQuery, [req.params.id])
        await client.query(secondQuery, [req.params.id])
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

// DELETE recipe ingredient
router.delete('/recipe/:id', async (req, res) => {
    console.log('In Delete:', req.params.id);
    const client = await pool.connect();
    try {
        const firstQuery = `DELETE FROM "ingredient_recipe"
                            WHERE "ingredient_id" = $1;`;
        const secondQuery = `DELETE FROM "ingredient"
                             WHERE "id" = $1;`;
        await client.query('BEGIN');
        await client.query(firstQuery, [req.params.id])
        await client.query(secondQuery, [req.params.id])
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

// UPDATE a ingredient for the user
router.put('/', (req, res) => {
    console.log("Editing", req.body);
    let queryText = `
        UPDATE "user_ingredient"
        SET "quantity" = $1
        WHERE "ingredient_id" = $2;
        `;
    pool.query(queryText, [req.body.quantity, req.body.ingredient_id])
        .then((result) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log("error in PUT edit", error);
        res.sendStatus(500);
    });
});

// UPDATE a ingredient for a recipe
router.put('/recipe', (req, res) => {
    console.log("Editing", req.body);
    let queryText = `
        UPDATE "ingredient_recipe"
        SET "quantity" = $1
        WHERE "ingredient_id" = $2;
        `;
    pool.query(queryText, [req.body.quantity, req.body.ingredient_id])
        .then((result) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log("error in PUT edit", error);
        res.sendStatus(500);
    });
});

router.post('/demo', async (req, res) => {
    console.log('Adding new demo:', req.body);
    const client = await pool.connect();
    try {
        const firstQuery = `INSERT INTO "ingredient" ("name")
                            VALUES ($1) RETURNING "id";`;
        const secondQuery = `INSERT INTO "ingredient_recipe" ("recipe_id", "ingredient_id", "quantity" )
                            VALUES ($1, $2, $3);`;
        await client.query('BEGIN');
        const result = await client.query(firstQuery, [req.body.one.name])
        await client.query(secondQuery, [req.body.recipe_id, result.rows[0].id, req.body.one.quantity ])
        const result2 = await client.query(firstQuery, [req.body.two.name])
        await client.query(secondQuery, [req.body.recipe_id, result2.rows[0].id, req.body.two.quantity ])
        const result3 = await client.query(firstQuery, [req.body.three.name])
        await client.query(secondQuery, [req.body.recipe_id, result3.rows[0].id, req.body.three.quantity ])
        const result4 = await client.query(firstQuery, [req.body.four.name])
        await client.query(secondQuery, [req.body.recipe_id, result4.rows[0].id, req.body.four.quantity ])
        const result5 = await client.query(firstQuery, [req.body.five.name])
        await client.query(secondQuery, [req.body.recipe_id, result5.rows[0].id, req.body.five.quantity ])
        const result6 = await client.query(firstQuery, [req.body.six.name])
        await client.query(secondQuery, [req.body.recipe_id, result6.rows[0].id, req.body.six.quantity ])
        const result7 = await client.query(firstQuery, [req.body.seven.name])
        await client.query(secondQuery, [req.body.recipe_id, result7.rows[0].id, req.body.seven.quantity ])
        const result8 = await client.query(firstQuery, [req.body.eight.name])
        await client.query(secondQuery, [req.body.recipe_id, result8.rows[0].id, req.body.eight.quantity ])
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
