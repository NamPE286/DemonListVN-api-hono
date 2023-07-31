import { Hono } from 'https://deno.land/x/hono@v3.3.1/mod.ts'
import Search from '@classes/Search.ts'

export const searchRoute = new Hono()

searchRoute.get('/:query', (ctx) => {
    const limit = parseInt(ctx.req.query('limit')!) || 10

    return ctx.json({})
})