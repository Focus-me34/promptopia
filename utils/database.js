import mangoose from 'mongoose';
let isConnected = false;

export const connectToDatabase = async () => {
  mangoose.set("strictQuery", true);

  if (isConnected) {
    console.log("=> MongoDB is already connected");
    return;
  }

  try {
    await mangoose.connect(process.env.MONGODB_URI, {
      db_name: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    isConnected = true

  } catch (error) {
    console.log(error);
  }
}
