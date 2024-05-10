import { v4 as uuidv4 } from 'uuid';
import { getBlogByIdModel } from '../../models/Blog.js';

const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await getBlogByIdModel(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve blog post" });
  }
};

export default getBlogById;