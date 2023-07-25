import { Hono } from 'https://deno.land/x/hono@v3.3.1/mod.ts'
import Player from '@classes/Player.ts'

export const playerRoute = new Hono()

/**
 * @openapi
 * /player/{uid}:
 *  get:
 *      tags:
 *      - Player
 *      summary: Get a player by UID
 *      parameters:
 *        - name: uid
 *          in: path
 *          description: The UID of the player
 *          required: true
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Return a player object
 *              content:
 *                  application/json:
 *                      schema:
 *          404:
 *              description: Player does not exist
 */
playerRoute.get('/:uid', async (ctx) => {
    const uid = ctx.req.param('uid')
    const player = new Player(uid)
    try {
        return ctx.json(await player.init())
    }
    catch (err) {
        console.error(err)
        return ctx.status(404)
    }
})

/**
 * @openapi
 * /player/{uid}/records:
 *  get:
 *      tags:
 *      - Player
 *      summary: Get level's records by UID
 *      parameters:
 *        - name: uid
 *          in: path
 *          description: The UID of the player
 *          required: true
 *          schema:
 *              type: string
 *        - name: sortBy
 *          in: query
 *          description: Sort by property
 *          required: false
 *          schema:
 *              type: string
 *        - name: start
 *          in: query
 *          description: Range start index
 *          required: false
 *          schema:
 *              type: integer
 *        - name: end
 *          in: query
 *          description: Range end index
 *          required: false
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Return an array of record objects
 *              content:
 *                  application/json:
 *                      schema:
 *          500:
 *              description: Failed operation
 */
playerRoute.get('/:uid/records', async (ctx) => {
    const uid = ctx.req.param('uid')
    const sortBy = ctx.req.query('sortBy') || 'timestamp'
    const start = parseInt(ctx.req.query('start')!) || 0
    const end = parseInt(ctx.req.query('end')!) || 50
    const player = new Player(uid)

    try {
        return ctx.json(await player.fetchRecords(true, sortBy, start, end))
    }
    catch (err) {
        console.error(err)
        return ctx.status(500)
    }
})

/**
 * @openapi
 * /player/{uid}/submissions:
 *  get:
 *      tags:
 *      - Player
 *      summary: Get level's submissions by UID
 *      parameters:
 *        - name: uid
 *          in: path
 *          description: The UID of the player
 *          required: true
 *          schema:
 *              type: string
 *        - name: sortBy
 *          in: query
 *          description: Sort by property
 *          required: false
 *          schema:
 *              type: string
 *        - name: start
 *          in: query
 *          description: Range start index
 *          required: false
 *          schema:
 *              type: integer
 *        - name: end
 *          in: query
 *          description: Range end index
 *          required: false
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Return an array of record objects
 *              content:
 *                  application/json:
 *                      schema:
 *          500:
 *              description: Failed operation
 */
playerRoute.get('/:uid/submissions', async (ctx) => {
    const uid = ctx.req.param('uid')
    const sortBy = ctx.req.query('sortBy') || 'timestamp'
    const start = parseInt(ctx.req.query('start')!) || 0
    const end = parseInt(ctx.req.query('end')!) || 50
    const player = new Player(uid)

    try {
        return ctx.json(await player.fetchRecords(false, sortBy, start, end))
    }
    catch (err) {
        console.error(err)
        return ctx.status(500)
    }
})