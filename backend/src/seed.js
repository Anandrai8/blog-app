import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "./src/models/Blog.js";

dotenv.config();

const blogs = [
  { title: "First Blog", content: "This is the first sample blog." },
  { title: "Second Blog", content: "This is another example blog." },
  { title: "Travel Story", content: "I love traveling to new places." },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected for seeding");
    await Blog.insertMany(blogs);
    console.log("✅ Sample blogs added");
    mongoose.disconnect();
  })
  .catch((err) => console.error(err));
