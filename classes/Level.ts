import { supabase } from "@db"
import Record from "@classes/Record.ts"
import { selectStr } from "@utils/selectStr.ts"

export default class {
    id: number
    name: string
    creator: string
    videoID: string
    minProgress: number
    flTop: number
    dlTop: number
    flPt: number
    rating: number
    ldm: number[]
    #initialized: boolean

    constructor(id: number) {
        this.id = id
        this.name = ''
        this.creator = ''
        this.videoID = ''
        this.minProgress = NaN
        this.flTop = NaN
        this.dlTop = NaN
        this.flPt = NaN
        this.rating = NaN
        this.ldm = []
        this.#initialized = false
    }

    async init(): Promise<this> {
        if (this.#initialized) {
            return this
        }

        const { data, error } = await supabase
            .from('levels')
            .select(selectStr(this))
            .eq('id', this.id)
            .single()

        if (error) {
            throw new Error(error.message)
        }

        this.#initialized = true
        Object.assign(this, data)

        return this
    }

    async fetchRecords(accepted = false, sortBy = 'timestamp', start = 0, end = 50): Promise<Record[]> {
        const { data, error } = await supabase
            .from('records')
            .select('*')
            .eq('levelid', this.id)
            .eq('isChecked', accepted)
            .order(sortBy)
            .range(start, end)

        if (error) {
            throw new Error(error.message)
        }

        const res: Record[] = []

        for (const i of data) {
            res.push(Object.assign(new Record('', 0), i))
        }

        return res
    }
}