import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(
      `MongoDB connection successful at: ${process.env.MONGO_URI}`.green
        .underline
    );
  } catch (error) {
    console.log(`MongoDB connection failed, error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDb;
