import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/rovers', {
      dbName: 'rovers',
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(`Error connectiong the mongoDB: [${error}]`);
    process.exit(1);
  }
}

export default connectDB;