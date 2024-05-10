import express from 'express';
import createBlog from '../controller/blogController/createBlog.js';
import getAllBlogs from '../controller/blogController/getAllBlogs.js';
import getBlogById from '../controller/blogController/getBlogById.js';
import tokenVerification from '../middleware/authMiddleware.js';
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';
import textExtract from '../controller/textExtractController/textExtract.js';
import subscription from '../controller/subscriptionController/snsSubscription.js';
import getBlogsForUserController from '../controller/blogController/blogForUser.js';

const router = express.Router();

const validateBlogPost = (req, res, next) => {
 const { title, content, author } = req.body;
 if (!title || !content || !author) {
    return res.status(400).json({ error: 'Title, content, and author are required' });
 }
 next();
};

router.post('/', tokenVerification, uploadMiddleware ,createBlog);
router.get('/', tokenVerification ,getAllBlogs);
router.get('/all-blogs', getBlogsForUserController)
router.get('/:id', tokenVerification ,getBlogById);
router.post('/text-extract', tokenVerification, uploadMiddleware ,textExtract)
router.post('/subscribe', tokenVerification, subscription)

export default router;
