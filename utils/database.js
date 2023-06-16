import mangoose from 'mongoose';
let isConnected = false;

export const connectToDB = async () => {
  mangoose.set("strictQuery", true);

  if (isConnected) {
    console.log("=> MongoDB is already connected");
    return;
  }

  try {
    await mangoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}
