import { Context, Next } from 'https://deno.land/x/hono@v3.3.1/mod.ts'
import { verify } from "https://esm.sh/jsonwebtoken@9.0.2";
import { JWT_SECRET } from '../env.ts';

export default async (ctx: Context, next: Next) => {
    const auth = ctx.req.headers.get('authorization')

    if (!auth || !auth.startsWith('Bearer')) {
        ctx.status(401)

        return ctx.json({})
    }

    const token = auth.split(' ')[1]!

    if (!token) {
        ctx.status(401)

        return ctx.json({})
    }

    try {
        verify(token, JWT_SECRET)

        await next()
    } catch {
        ctx.status(401)
        return ctx.json({})
    }
}