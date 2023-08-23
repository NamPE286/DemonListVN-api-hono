import { Hono } from 'https://deno.land/x/hono@v3.3.1/mod.ts'
import Search from '@classes/Search.ts'

export const searchRoute = new Hono()

/**
 * @openapi
 * /search/{query}:
 *  get:
 *      tags:
 *      - Search
 *      summary: Search levels and players
 *      parameters:
 *        - name: query
 *          in: path
 *          description: The search query
 *          required: true
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Return a levels and player list
 *              content:
 *                  application/json:
 *                      schema:
 */
searchRoute.get('/:query', async (ctx) => {
    const query = ctx.req.param('query')
    const limit = parseInt(ctx.req.query('limit')!) || 10
    const search = new Search(limit);

    return ctx.json({
        levels: await search.levels(query),
        players: await search.players(query)
    })
})