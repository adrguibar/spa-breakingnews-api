import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Connecting to database...");

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDb Atlas Connected"))
    .catch((error) => {
        console.log(error);
    });
};
export default connectDatabase;
