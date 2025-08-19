console.log('Starting simple test...');

try {
  console.log('Testing basic imports...');
  const express = await import('express');
  console.log('✅ Express imported');
  
  const nodemailer = await import('nodemailer');
  console.log('✅ Nodemailer imported');
  
  console.log('✅ All imports successful');
} catch (error) {
  console.error('❌ Import failed:', error.message);
  console.error('Stack:', error.stack);
}

