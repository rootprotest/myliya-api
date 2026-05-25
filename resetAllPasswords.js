const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const MONGO_URI =
  "mongodb+srv://sadamdon1234:1YktFZRZ1cX0PRj4@cluster0.nhacelr.mongodb.net/myliya-db?retryWrites=true&w=majority&appName=Cluster0";

const NEW_PASSWORD = "Root@1234";

async function resetAllPasswords() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const hashed = await bcrypt.hash(NEW_PASSWORD, 10);

  const result = await mongoose.connection
    .collection("users")
    .updateMany({}, { $set: { password: hashed } });

  console.log(`Updated ${result.modifiedCount} users with new password.`);
  await mongoose.disconnect();
  console.log("Done.");
}

resetAllPasswords().catch((err) => {
  console.error(err);
  process.exit(1);
});
