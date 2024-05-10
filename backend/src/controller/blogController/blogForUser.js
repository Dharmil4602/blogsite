import { getBlogsForUser } from "../../models/Blog.js";

const getBlogsForUserController = async (req, res) => {
    try {
        const blogs = await getBlogsForUser();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve blog posts" });
    }
}

export default getBlogsForUserController