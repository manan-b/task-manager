import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import taskRoutes from './routes/tasks';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Task Management API is running' });
});

app.use('/api/tasks', taskRoutes);

connectDB();

if (require.main === module) {
    const startServer = async () => {
        try {
            app.listen(PORT, () => {
            });
        } catch (error) {
            process.exit(1);
        }
    };

    startServer();
}

export default app;
