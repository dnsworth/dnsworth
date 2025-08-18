import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Loading environment...');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

console.log('Environment loaded:');
console.log('ZOHO_APP_PASSWORD:', process.env.ZOHO_APP_PASSWORD ? 'SET' : 'NOT SET');

try {
  console.log('Testing email module...');
  const { createTransporter } = await import('./src/config/email.js');
  console.log('✅ Email module imported');
  
  const transporter = createTransporter();
  console.log('✅ Transporter created');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('Stack:', error.stack);
}
