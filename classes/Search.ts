import { supabase } from "@db"
import { selectStr } from "@utils/selectStr.ts"
import Level from "@classes/Level.ts";
import * as uuid from "https://deno.land/std@0.194.0/uuid/mod.ts";
import Player from "@classes/Player.ts";

function isNumeric(value: string) {
    return /^-?\d+$/.test(value);
}

export default class {
    limit: number

    constructor(limit: number) {
        this.limit = limit
    }

    async levels(query: string): Promise<Level[]> {
        if (isNumeric(query)) {
            const { data, error } = await supabase
                .from('levels')
                .select(selectStr(new Level(0)))
                .eq('id', query)
                .limit(this.limit)

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
            .ilike('name', `%${query}%`)
            .limit(this.limit)

        if (error) {
            throw new Error(error.message)
        }

        const res: Level[] = []

        for (const i of data) {
            res.push(Object.assign(new Level(0), i));
        }

        return res
    }

    async players(query: string): Promise<Player[]> {
        if (uuid.validate(query)) {
            const { data, error } = await supabase
                .from('players')
                .select('name, uid, isHidden')
                .eq('uid', query)
                .eq('isHidden', false)

            if (error) {
                throw new Error(error.message)
            }

            const res: Player[] = []

            for (const i of data) {
                res.push(Object.assign(new Player(''), i));
            }

            return res
        }

        const { data, error } = await supabase
            .from('players')
            .select('name, uid, isHidden')
            .ilike('name', `%${query}%`)
            .eq('isHidden', false)

        if (error) {
            throw new Error(error.message)
        }

        const res: Player[] = []

        for (const i of data) {
            res.push(Object.assign(new Player(''), i));
        }

        return res
    }
}