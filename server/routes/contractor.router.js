const express = require('express');
const {
  rejectUnauthenticated, requireAdmin
} = require('../modules/authentication-middleware');

const pool = require('../modules/pool');
const router = express.Router();

// GET all contractors. Requires admin status
router.get('/', requireAdmin, (req, res) => {

    let querytext = `
        SELECT * FROM "contractor_profile";
    `;
    pool.query(querytext)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET all contractors", error);
            res.sendStatus(500);
        });
});

// GET specific contractor info. Requires admin status
router.get('/specific/:id', requireAdmin, (req, res) => {
    let querytext = `
        SELECT "contractor_profile".*, "user"."type" AS "user_type" FROM "contractor_profile"
        JOIN "user" ON "user"."id" = "contractor_profile"."user_id"
        WHERE "contractor_profile"."user_id" = $1;
    `;
    pool.query(querytext,[req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET contractor by id", error);
            res.sendStatus(500);
        })
    ;
});

// GET contractor info for requesting user only.
// Does not require admin status
router.get('/self/user', rejectUnauthenticated, (req, res) => {
    let querytext = `
        SELECT
        contractor_profile.id, contractor_profile.user_id, 
        contractor_profile.base_audio_video_rate, contractor_profile.base_written_rate,
        contractor_profile.contractor_name, contractor_profile.available,  
        contractor_profile.notes, contractor_profile.phone, contractor_profile.linked_in,
        contractor_profile."location", contractor_profile.timezone,
        "user".username AS email
        FROM contractor_profile
        JOIN "user" ON "user"."id" = contractor_profile.user_id
        WHERE contractor_profile.user_id = $1;
    `;
    pool.query(querytext,[req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET contractor by id", error);
            res.sendStatus(500);
        })
    ;
});

// GET contractor languages for requesting user only.
// Does not require admin status
router.get('/self/languages', rejectUnauthenticated, (req, res) => {
    let querytext = `
        SELECT
        contractor_language.id, contractor_language.user_id,
        from_language."name" AS from_language, to_language."name" AS to_language
        FROM contractor_language
        JOIN languages AS from_language ON from_language.id = contractor_language.from_language_id
        JOIN languages AS to_language ON to_language.id = contractor_language.to_language_id
        WHERE contractor_language.user_id = $1; 
    `;
    pool.query(querytext,[req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET contractor by id", error);
            res.sendStatus(500);
        })
    ;
});

// GET contractor service info for requesting user only.
// Does not require admin status
router.get('/self/services', rejectUnauthenticated, (req, res) => {
    let querytext = `
        SELECT
        contractor_services.id,
        contractor_services.contractor_id,
        services."type" AS service_type
        FROM contractor_services
        JOIN services ON services.id = contractor_services.service_id
        WHERE contractor_services.contractor_id = $1;
    `;
    pool.query(querytext,[req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET contractor/services by id", error);
            res.sendStatus(500);
        })
    ;
});

// GET specific contractor language info. Requires admin status
router.get('/:id/languages', requireAdmin, (req, res) => {
    let querytext = `
        SELECT * FROM "contractor_language"
        WHERE "contractor_language"."user_id" = $1;
    `;
    pool.query(querytext,[req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET contractor languages", error);
            res.sendStatus(500);
        })
    ;
});

// GET specific contractor services info. Requires admin status
router.get('/:id/services', requireAdmin, (req, res) => {
    let querytext = `
        SELECT * FROM "contractor_services"
        WHERE "contractor_services"."user_id" = $1;
    `;
    pool.query(querytext,[req.params.id])
        .then((result) => {
            console.log(result.rows)
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET contractor services", error);
            res.sendStatus(500);
        })
    ;
});

// TODO: Needs updated column names
// GET contractor id/names without additional info
router.get('/list', rejectUnauthenticated, (req, res) => {
    let querytext = `
        SELECT "contractor_profile"."id", "contractor_profile"."name" FROM "contractor_profile";
    `;
    pool.query(querytext,[req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET contractor by id", error);
            res.sendStatus(500);
        })
    ;
});

// GET contractor info for requesting user only.
// Does not require admin status
router.get('/self/user', rejectUnauthenticated, (req, res) => {
    let querytext = `
        SELECT
        contractor_profile.id, contractor_profile.user_id, 
        contractor_profile.base_audio_video_rate, contractor_profile.base_written_rate,
        contractor_profile.contractor_name, contractor_profile.available,  
        contractor_profile.notes, contractor_profile.phone, contractor_profile.linked_in,
        contractor_profile."location", contractor_profile.timezone,
        "user".username AS email
        FROM contractor_profile
        JOIN "user" ON "user"."id" = contractor_profile.user_id
        WHERE contractor_profile.user_id = $1;
    `;
    pool.query(querytext,[req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET contractor by id", error);
            res.sendStatus(500);
        })
    ;
});

// TODO: Need finalized columns to create POST
/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
	let querytext = `
	    // QUERY GOES HERE
	`;
	pool.query(querytext,[])
        .then((result) => {
            // Code to send goes here
            res.sendStatus(201)
        })
        .catch((error) => {
            console.error("Error in POST", error);
            res.sendStatus(500);
        })
	;
});

// TODO: Need finalized columns to create PUT
/**
 * PUT route template
 */
router.put('/', rejectUnauthenticated, (req, res) => {
	let querytext = `
	    // QUERY GOES HERE
	`;
	pool.query(querytext,[])
        .then((result) => {
            // Code to send goes here
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error("Error in PUT", error);
            res.sendStatus(500);
        })
    ;
})

//PUT Route for updating a single contractor's info
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.body is', req.body)
	let querytext = `
	    UPDATE "contractor_profile" 
        SET "contractor_name" = $1, 
        "timezone" = $2, 
        "location" = $3, 
        "phone" = $4,
        "signed_nda" = $5,
        "linkedIn" = $6, 
        "base_written_rate" = $7, 
        "base_audio_video_rate" = $8,
        "notes" = $9
        WHERE "contractor_profile"."user_id" = $10;
	`;
	pool.query(querytext,[
        req.body.contractor_name,
        req.body.timezone,
        req.body.location,
        req.body.phone,
        req.body.signed_nda,
        req.body.linkedIn,
        req.body.base_written_rate,
        req.body.base_audio_video_rate,
        req.body.notes,
        req.params.id
    ])
        .then((result) => {
            // Code to send goes here
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error("Error in PUT", error);
            res.sendStatus(500);
        })
    ;
})

// Toggle availability for self
router.put('/availability', rejectUnauthenticated, (req, res) => {
	let querytext = `
	    UPDATE "contractor_profile"
        SET "available" = NOT "available"
        WHERE "contractor_profile"."user_id" = $1;
	`;
	pool.query(querytext,[req.user.id])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error("Error in PUT", error);
            res.sendStatus(500);
        })
    ;
})

// Toggle availability for admin
router.put('/availability-admin/:id', requireAdmin, (req, res) => {
	let querytext = `
	    UPDATE "contractor_profile"
        SET "available" = NOT "available"
        WHERE "contractor_profile"."user_id" = $1;
	`;
	pool.query(querytext,[req.params.id])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error("Error in PUT", error);
            res.sendStatus(500);
        })
    ;
})

// PUT contractor settings
router.put('/self/settings', rejectUnauthenticated, (req, res) => {
	let querytext = `UPDATE contractor_profile SET available = ${req.body.params.available}, 
        contractor_name = ${req.body.params.name}, 
        linked_in = ${req.body.params.linkedIn}, 
        phone = ${req.body.params.phone}, 
        timezone = ${req.body.params.timezone}, 
        location = ${req.body.params.location},
        base_written_rate = ${req.body.params.writtenRate},
        base_audio_video_rate = ${req.body.params.minuteRate}
        WHERE user_id = ${req.body.params.id}
	`;
	pool.query(querytext)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error("Error in PUT /contractor/settings", error);
            res.sendStatus(500);
        })
	;
});

// POST contractor languages for contractor view
// Does not require admin status
router.post('/self/languages', rejectUnauthenticated, (req, res) => {
    let querytext = `
        INSERT INTO contractor_language (user_id, from_language_id, to_language_id)
        VALUES ($1, $2, $3);
    `;
    pool.query(querytext,[req.user.id])
        .then((result) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.error("Error in POST contractor language", error);
            res.sendStatus(500);
        })
    ;
});

// POST contractor services for contractor view
// Does not require admin status
router.post('/self/services', rejectUnauthenticated, (req, res) => {
    let querytext = `
        INSERT INTO contractor_services (service_id, contractor_id)
        VALUES ($1, $2);
    `;
    pool.query(querytext,[req.user.id])
        .then((result) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.error("Error in POST contractor service", error);
            res.sendStatus(500);
        })
    ;
});

router.delete('/self/languages/:id', rejectUnauthenticated, (req, res) => {
	let querytext = `
		DELETE FROM contractor_language WHERE id = $1
	`;
	pool.query(querytext, [req.params.id])
		.then((result) => {
			res.sendStatus(200)
		})
		.catch((error) => {
			console.error("Error in DELETE contractor language", error);
			res.sendStatus(500);
		})
	;
});

router.delete('/self/services/:id', rejectUnauthenticated, (req, res) => {
	let querytext = `
		DELETE FROM contractor_services WHERE id = $1
	`;
	pool.query(querytext, [req.params.id])
		.then((result) => {
			res.sendStatus(200)
		})
		.catch((error) => {
			console.error("Error in DELETE contractor service", error);
			res.sendStatus(500);
		})
	;
});

module.exports = router;