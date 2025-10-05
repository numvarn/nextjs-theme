const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Simple .env.local parser
function loadEnv() {
  try {
    const envPath = path.join(__dirname, '..', '.env.local');
    const envFile = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    
    envFile.split('\n').forEach(line => {
      if (line && !line.startsWith('#') && line.includes('=')) {
        const [key, ...valueParts] = line.split('=');
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    });
    
    Object.assign(process.env, envVars);
  } catch (error) {
    console.error('Could not load .env.local:', error.message);
  }
}

loadEnv();

async function testConnection() {
  try {
    console.log('🔄 กำลังทดสอบการเชื่อมต่อ MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI ? '✅ พบ MONGODB_URI' : '❌ ไม่พบ MONGODB_URI');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ เชื่อมต่อ MongoDB สำเร็จ!');
    
    // Test User model
    const User = mongoose.model('User', new mongoose.Schema({
      email: String,
      name: String,
      provider: String,
      providerId: String,
      role: { type: String, default: 'user' },
      createdAt: { type: Date, default: Date.now }
    }));
    
    const userCount = await User.countDocuments();
    console.log(`📊 จำนวนผู้ใช้ในฐานข้อมูล: ${userCount} คน`);
    
    // Check for Google OAuth users
    const googleUsers = await User.countDocuments({ provider: 'google' });
    console.log(`🔍 จำนวนผู้ใช้ที่เข้าสู่ระบบด้วย Google: ${googleUsers} คน`);
    
    await mongoose.connection.close();
    console.log('✅ ปิดการเชื่อมต่อฐานข้อมูลเรียบร้อย');
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  testConnection();
}

module.exports = testConnection;
