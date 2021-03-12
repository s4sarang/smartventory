import mongoose from 'mongoose';
import User from './models/userModel.js';
import Assets from './models/assetsModel.js';
import dotenv from 'dotenv';
import connectDb from './config/dbConfig.js';
import colors from 'colors';
import { readFile } from 'fs/promises';
const assets = JSON.parse(
  await readFile(new URL('./data/assets.json', import.meta.url))
);
import users from './data/users.js';

dotenv.config();
connectDb();

const importData = async () => {
  {
    try {
      await User.deleteMany();
      await Assets.deleteMany();

      const createdUsers = await User.insertMany(users);

      const adminUser = createdUsers[0]._id;

      //spread operator? > got it!
      const sampleAssets = assets.map((assets) => {
        return { ...assets, user: adminUser };
      });

      await Assets.insertMany(sampleAssets);

      console.log('Data Imported!'.green.inverse);
      process.exit();
    } catch (error) {
      console.log(`${error}`.red.inverse);
      process.exit(1);
    }
  }
};

const destroyData = async () => {
  {
    try {
      await User.deleteMany();
      await Assets.deleteMany();

      console.log('Data Destroyed!'.green.inverse);
      process.exit();
    } catch (error) {
      console.log(`${error}`.red.inverse);
      process.exit(1);
    }
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
