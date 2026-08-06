import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tizubxhimjmwwqwwayyh.supabase.co";
const supabaseAnonKey = "sb_publishable_pKl3vPyv_PZwEtMymK5DxQ_ugx3XLnX";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);