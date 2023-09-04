import { Hono } from 'https://deno.land/x/hono@v3.3.1/mod.ts'
import { levelRoute } from './routes/level.ts'
import { playerRoute } from './routes/player.ts'
import { listRoute } from './routes/list.ts'
import { searchRoute } from './routes/search.ts'
import apiSpec from './openAPISpec.json' assert {type: 'json'}

const app = new Hono()

app.get('/', (ctx) => {
    return ctx.json({ timestamp: new Date() })
})

app.get('/docs.json', (ctx) => {
    return ctx.json(apiSpec)
})

app.route('/level', levelRoute)
app.route('/player', playerRoute)
app.route('/list', listRoute)
app.route('/search', searchRoute)

Deno.serve(app.fetch)
