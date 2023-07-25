// @deno-types='https://esm.sh/v129/@supabase/supabase-js@2.29.0/dist/module/index.d.ts'
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";
import { SUPABASE_API_URL, SUPABASE_API_KEY } from "./env.ts";

export const supabase = createClient(SUPABASE_API_URL, SUPABASE_API_KEY, {
    auth: {
        persistSession: false
    }
})