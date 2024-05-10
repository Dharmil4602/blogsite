import { createBlogModel, uploadImageToS3 } from "../../models/Blog.js";

const createBlog = async (req, res) => {
  console.log("Request Body Create Blog: ", req.body);
  const { title, content, author } = req.body;
  const file = req.file;
  console.log("File: ", file);
  console.log("File object: ", req.file);
  console.log("User: ", req.user);
  const userId = req.user.userId;
  const secretName = "blogSecretManager"

  try {
    if (!file || !file.buffer) {
      return res.status(400).json({ error: 'File upload is required' });
    }
    
    const imageUrl = await uploadImageToS3(file, userId, secretName);
    const blog = await createBlogModel(title, author, content, userId, imageUrl);

    res.status(201).json({ message: "Blog created successfully", blog: {...blog, imageUrl} });
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog post" });
  }
};

export default createBlog;
