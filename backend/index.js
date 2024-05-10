import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from "./src/routes/auth.js"
import blogRoutes from "./src/routes/blog.js"
import getSecret from './src/controller/secretController/getSecrets.js';
import postSecrets from './src/controller/secretController/postSecrets.js';
import sendEmailController from './src/controller/subscriptionController/sendEmail.js';
import tokenVerification from './src/middleware/authMiddleware.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/user', authRoutes);
app.use('/api/blog', blogRoutes);

app.get('/api/secrets', getSecret)
app.post('/api/secrets', postSecrets)
app.post('/api/send-email', tokenVerification ,sendEmailController)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
