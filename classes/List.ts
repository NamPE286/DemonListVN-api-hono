import { supabase } from "@db"
import { selectStr } from "@utils/selectStr.ts"
import Level from "@classes/Level.ts"

export default class {
    type: string

    constructor(type: string) {
        this.type = type
    }

    async fetchLevels(sortBy = 'id', start = 0, end = 50): Promise<Level[]> {
        const { data, error } = await supabase
            .from('levels')
            .select(selectStr(new Level(0)))
            .not(`${this.type}Top`, 'is', null)
            .order(sortBy)
            .range(start, end)
        
        if(error) {
            throw new Error(error.message)
        }

        const res: Level[] = []

        for(const i of data) {
            res.push(Object.assign(new Level(0), i));
        }

        return res
    }
}