import { getAllBlogsModel } from '../../models/Blog.js';

const getAllBlogs = async (req, res) => {
  const userId = req.user.userId
  console.log("User from getAllBlogs: ", userId);
  try {
    const blogs = await getAllBlogsModel(userId);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
};

export default getAllBlogs;