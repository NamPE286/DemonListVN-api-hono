import { supabase } from "@db"
import { selectStr } from "@utils/selectStr.ts"
import Level from "@classes/Level.ts";
import * as uuid from "https://deno.land/std@0.194.0/uuid/mod.ts";

function isNumeric(value: string) {
    return /^-?\d+$/.test(value);
}

export default class {
    query: string

    constructor(query: string) {
        this.query = query
    }

    async levelSearch( limit = 10) {
        if (isNumeric(this.query)) {
            const { data, error } = await supabase
                .from('levels')
                .select(selectStr(new Level(0)))
                .eq('id', this.query)
                .limit(limit)

            if (error) {
                throw new Error(error.message)
            }

            const res: Level[] = []

            for (const i of data) {
                res.push(Object.assign(new Level(0), i));
            }

            return res
        }

        const { data, error } = await supabase
            .from('levels')
            .select(selectStr(new Level(0)))
            .ilike('name', `%${this.query}%`)
            .limit(limit)

        if (error) {
            throw new Error(error.message)
        }

        const res: Level[] = []

        for (const i of data) {
            res.push(Object.assign(new Level(0), i));
        }

        return res
    }

    async playerSearch(limit: number) {

    }
}