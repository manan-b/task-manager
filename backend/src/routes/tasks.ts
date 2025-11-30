import express, { Request, Response } from 'express';
import Task from '../models/Task';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, description, status } = req.body;

        const newTask = new Task({
            title,
            description,
            status: status || 'todo',
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: 'Error creating task', error });
    }
});

router.patch('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task', error });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting task', error });
    }
});

export default router;
