import { Hono } from 'https://deno.land/x/hono@v3.3.1/mod.ts'
import PlayerSearch from '@classes/PlayerSearch.ts'

export const playerSearchRoute = new Hono()

/**
 * @openapi
 * /playerSearch/{province}/{city}:
 *  get:
 *      tags:
 *      - Player search
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
playerSearchRoute.get('/:province/:city?', async (ctx) => {
    const province = ctx.req.param('province')!
    const city = ctx.req.param('city')
    const playerSearch = new PlayerSearch()

    if (city) {
        return ctx.json(await playerSearch.searchByCity(city))
    }

    return ctx.json(await playerSearch.searchByProvince(province))
})