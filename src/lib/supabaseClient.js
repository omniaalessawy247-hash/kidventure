import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kgdkhcwocnimnyuxtqcn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_jOqfat6bEkLF3oC0j5kAqg_XsyXmPHD';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);