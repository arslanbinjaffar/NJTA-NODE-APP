import { connect } from "mongoose";

const mongodbConnection = async () => {
  try {
    await connect(process.env.MONGO_DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
export default mongodbConnection;
