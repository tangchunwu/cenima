import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

// Load .env file manually since we are running a script
const envConfig = dotenv.parse(fs.readFileSync('.env'));

const supabaseUrl = envConfig.VITE_SUPABASE_URL;
const supabaseKey = envConfig.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
       console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env file');
       process.exit(1);
}

console.log('✅ Found Supabase credentials in .env');
console.log(`   URL: ${supabaseUrl}`);

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
       console.log('🔄 Attempting to connect to Supabase...');

       // Try to select from a table we expect to exist OR just checking health
       const { data, error } = await supabase
              .from('participant_stats')
              .select('count', { count: 'exact', head: true });

       if (error) {
              if (error.code === '42P01') { // undefined_table
                     console.log('❌ Connection successful, BUT tables are missing.');
                     console.log('   The table "participant_stats" does not exist.');
                     process.exit(0);
              }
              console.error('❌ Connection failed or error querying database:');
              console.error(error);
       } else {
              console.log('✅ Connection successful!');
              console.log('✅ Table "participant_stats" exists.');
              console.log(`   Current row count: ${data?.length ?? 'Unknown'}`);
       }
}

checkDatabase();
