import { supabase } from "@db"
import { selectStr } from "@utils/selectStr.ts"
import Record from "@classes/Record.ts"

export default class {
    name: string
    facebook: string
    youtube: string
    discord: string
    totalFLpt: number
    totalDLpt: number
    flrank: number
    dlrank: number
    uid: string
    isAdmin: boolean
    isHidden: boolean
    rating: number
    overallRank: number
    province: string
    city: string
    #initialized: boolean

    constructor(uid: string) {
        this.uid = uid
        this.name = ''
        this.facebook = ''
        this.youtube = ''
        this.discord = ''
        this.totalFLpt = NaN
        this.totalDLpt = NaN
        this.flrank = NaN
        this.dlrank = NaN
        this.isAdmin = false
        this.isHidden = false
        this.rating = NaN
        this.overallRank = NaN
        this.province = ''
        this.city = ''
        this.#initialized = false
    }

    async init(): Promise<this> {
        if (this.#initialized) {
            return this
        }

        const { data, error } = await supabase
            .from('players')
            .select(selectStr(this))
            .eq('uid', this.uid)
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
            .select(selectStr(new Record('', 0)))
            .eq('userid', this.uid)
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