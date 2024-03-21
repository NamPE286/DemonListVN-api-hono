import { supabase } from "@db"
import { selectStr } from "@utils/selectStr.ts"
import Player from "@classes/Player.ts";

export default class {
    async searchByProvince(province: string): Promise<Player[]> {
        const { data, error } = await supabase
            .from('players')
            .select(selectStr(new Player('')))
            .eq('province', province)
            .eq('isHidden', false)
            .order('rating', {ascending: false})

        if (error) {
            throw error
        }

        const res: Player[] = []

        for (const i of data) {
            res.push(Object.assign(new Player(''), i))
        }

        return res
    }

    async searchByCity(city: string): Promise<Player[]> {
        const { data, error } = await supabase
            .from('players')
            .select(selectStr(new Player('')))
            .eq('city', city)
            .eq('isHidden', false)
            .order('rating', {ascending: false})

        if (error) {
            throw error
        }

        const res: Player[] = []

        for (const i of data) {
            res.push(Object.assign(new Player(''), i))
        }

        return res
    }
}