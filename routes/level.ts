import { Hono } from 'https://deno.land/x/hono@v3.3.1/mod.ts'
import Level from '@classes/Level.ts'

export const levelRoute = new Hono()

/**
 * @openapi
 * /level/{id}:
 *  get:
 *      tags:
 *      - Level
 *      summary: Get a level by ID
 *      parameters:
 *        - name: id
 *          in: path
 *          description: The ID of the level
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Return a level object
 *              content:
 *                  application/json:
 *                      schema:
 *          404:
 *              description: Level does not exist
 */
levelRoute.get('/:id', async (ctx) => {
    const id = ctx.req.param('id')
    const level = new Level(parseInt(id))
    try {
        return ctx.json(await level.init())
    }
    catch (err) {
        console.error(err)
        ctx.status(404)

        return ctx.json(err)
    }
})

/**
 * @openapi
 * /level/{id}/records:
 *  get:
 *      tags:
 *      - Level
 *      summary: Get a level's records by ID
 *      parameters:
 *        - name: id
 *          in: path
 *          description: The ID of the level
 *          required: true
 *          schema:
 *              type: integer
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
 *          404:
 *              description: Level does not exist
 */
levelRoute.get('/:id/records', async (ctx) => {
    const id = ctx.req.param('id')
    const sortBy = ctx.req.query('sortBy') || 'timestamp'
    const start = parseInt(ctx.req.query('start')!) || 0
    const end = parseInt(ctx.req.query('end')!) || 50
    const level = new Level(parseInt(id))

    try {
        return ctx.json(await level.fetchRecords(true, sortBy, start, end))
    }
    catch (err) {
        console.error(err)
        return ctx.status(500)
    }
})