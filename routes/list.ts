import { Hono } from 'https://deno.land/x/hono@v3.3.1/mod.ts'
import List from '../classes/List.ts'

export const listRoute = new Hono()

/**
 * @openapi
 * /list/{type}:
 *  get:
 *      tags:
 *      - Level
 *      summary: Get levels by list
 *      parameters:
 *        - name: type
 *          in: path
 *          description: The type of list
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
listRoute.get('/:type', async (ctx) => {
    const type = ctx.req.param('type')
    const sortBy = ctx.req.query('sortBy') || `${type}Top`
    const start = parseInt(ctx.req.query('start')!) || 0
    const end = parseInt(ctx.req.query('end')!) || 50
    const list = new List(type)

    try {
        return ctx.json(await list.fetchLevels(sortBy, start, end))
    }
    catch (err) {
        console.error(err)
        ctx.status(500)
    }
})

/**
 * @openapi
 * /list/{type}/progress/{uid}:
 *  get:
 *      tags:
 *      - Level
 *      summary: Get levels by list
 *      parameters:
 *        - name: type
 *          in: path
 *          description: The type of list
 *          required: true
 *          schema:
 *              type: string
 *        - name: uid
 *          in: path
 *          description: UUID of player
 *          required: true
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
 *              description: Return an dictionary of progress
 *              content:
 *                  application/json:
 *                      schema:
 *          500:
 *              description: Failed operation
 */
listRoute.get('/:type/progress/:uid', async (ctx) => {
    const type = ctx.req.param('type')
    const start = parseInt(ctx.req.query('start')!) || 0
    const end = parseInt(ctx.req.query('end')!) || 50
    const uid = String(ctx.req.param('uid'))
    const list = new List(type)

    try {
        return ctx.json(await list.fetchProgress(uid, start, end))
    }
    catch (err) {
        console.error(err)
        ctx.status(500)
    }
})