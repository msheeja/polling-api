import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Connecting to database...");
    const res = await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongodb connected with server ${res.connection.host}`);
  } catch (error) {
    console.log("Mongodb connection failed!");
    console.log(error);
  }
};
