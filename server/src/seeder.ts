// server/src/seeder.ts
import mongoose from 'mongoose';
import Product from './models/productModel';
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.MONGO_URI!).then(async () => {
  await Product.deleteMany();
  await Product.insertMany([
    {
      name: 'Beef Stew',
      description: 'Delicious Kenyan-style beef stew',
      image: '/images/beef.jpg',
      price: 350,
      category: 'food',
    },
    {
      name: 'Taji Bottled Water',
      description: 'Clean mineral water 500ml',
      image: '/images/water.jpg',
      price: 50,
      category: 'water',
    },
    {
      name: 'Chocolate Cake Slice',
      description: 'Moist chocolate cake with frosting',
      image: '/images/cake.jpg',
      price: 200,
      category: 'cakes',
    },
  ]);
  console.log('Seeded sample products!');
  process.exit();
});
