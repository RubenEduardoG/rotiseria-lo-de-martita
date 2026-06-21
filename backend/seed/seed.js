const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Product = require('../src/models/Product');
const User = require('../src/models/User');
const products = require('./products.json');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rotiseria_martita';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to DB for seeding');

    // Clear existing products
    await Product.deleteMany({});
    const created = await Product.insertMany(products);
    console.log(`Inserted ${created.length} products`);

    // Create admin user if not exists
    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@martita.local';
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'admin123';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = new User({ nombre: 'Admin Martita', email: adminEmail, password: adminPassword, role: 'admin' });
      await admin.save();
      console.log('Created admin user:', adminEmail);
    } else {
      console.log('Admin user already exists');
    }

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
