require("dotenv").config();
const mongoose = require("mongoose");

main()
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI, {
    // hosting configuration
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = main;
