import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI as string;
    await mongoose.connect(uri, {
      dbName: 'rovers',
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(`Error connectiong the mongoDB: [${error}]`);
    process.exit(1);
  }
}

export default connectDB;