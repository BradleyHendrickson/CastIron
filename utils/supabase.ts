import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://brzzxtdgljybozfmdskg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyenp4dGRnbGp5Ym96Zm1kc2tnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMDE3MTYsImV4cCI6MjA3Mjg3NzcxNn0.yXzWHiLySBWaZfidoP9vRj-rrAdKaBvxCXTqZJGRvms';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
