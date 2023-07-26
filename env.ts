// deno-lint-ignore-file
import { load } from "https://deno.land/std@0.195.0/dotenv/mod.ts";

async function getEnv(key: string) {
    try{
        console.log(`Using ${key} in .env file`)
        const res = (await load())[key]
        if(!res) {
            console.warn(`Failed to load ${key} from .env file. Using ${key} in system env`)
            return Deno.env.get(key)
        }
    }
    catch {
        console.warn(`Failed to load ${key} from .env file. Using ${key} in system env`)
        return Deno.env.get(key)
    }
}

export const SUPABASE_API_KEY: string = (await getEnv("SUPABASE_API_KEY"))!
export const SUPABASE_API_URL: string = (await getEnv("SUPABASE_API_URL"))!
