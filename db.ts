// @deno-types='https://esm.sh/v129/@supabase/supabase-js/dist/module/index.d.ts'
import { createClient } from "https://esm.sh/@supabase/supabase-js";
import { SUPABASE_API_URL, SUPABASE_API_KEY } from "./env.ts";

export const supabase = createClient(SUPABASE_API_URL, SUPABASE_API_KEY, {
    auth: {
        persistSession: false
    }
})