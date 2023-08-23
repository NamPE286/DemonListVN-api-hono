import { Hono } from 'https://deno.land/x/hono@v3.3.1/mod.ts'
import Search from '@classes/Search.ts'

export const searchRoute = new Hono()

searchRoute.get('/:query', async (ctx) => {
    const query = ctx.req.param('query')
    const limit = parseInt(ctx.req.query('limit')!) || 10
    const search = new Search(limit);

    return ctx.json({
        levels: await search.levels(query),
        players: await search.players(query)
    })
})