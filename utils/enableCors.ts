import { Hono } from "https://deno.land/x/hono@v3.3.1/mod.ts";
import { cors } from "https://deno.land/x/hono@v3.6.0/middleware.ts"

export function enableCors(app: Hono) {
    app.use('*', cors())
}