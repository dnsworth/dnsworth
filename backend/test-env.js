import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

console.log('Environment check:');
console.log('ZOHO_APP_PASSWORD:', process.env.ZOHO_APP_PASSWORD ? 'SET' : 'NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

// Test email import
try {
  const { createTransporter } = await import('./src/config/email.js');
  console.log('✅ Email module imported successfully');
  
  // Test transporter creation
  try {
    const transporter = createTransporter();
    console.log('✅ Transporter created successfully');
  } catch (error) {
    console.log('❌ Transporter creation failed:', error.message);
  }
} catch (error) {
  console.log('❌ Email module import failed:', error.message);
}
