const User = require('../models/User');
const Task = require('../models/Task');
const UserTask = require('../models/userTask');
const { cosine } = require('ml-distance/lib/similarities');

exports.getRecommendations = async (req, res) => {
    try {
        // Get the first user from the database
        const user = await User.findOne();
        if (!user) {
            return res.status(404).json({ message: 'No user found' });
        }

        const userTasks = await UserTask.find({ user_id: user._id });
        const allTasks = await Task.find();

        // Create user-task matrix
        const userTaskMatrix = {};
        userTasks.forEach(ut => {
            if (!userTaskMatrix[ut.user_id]) userTaskMatrix[ut.user_id] = {};
            userTaskMatrix[ut.user_id][ut.task_id] = ut.rating;
        });

        // Calculate task similarity
        const taskSimilarity = {};
        allTasks.forEach(task1 => {
            taskSimilarity[task1._id] = {};
            allTasks.forEach(task2 => {
                const vector1 = Object.values(userTaskMatrix).map(u => u[task1._id] || 0);
                const vector2 = Object.values(userTaskMatrix).map(u => u[task2._id] || 0);
                taskSimilarity[task1._id][task2._id] = cosine(vector1, vector2);
            });
        });

        // Get user's rated tasks
        const userRatedTasks = userTasks.filter(ut => ut.rating > 0);

        // Calculate recommendations
        const recommendations = allTasks.map(task => {
            const score = userRatedTasks.reduce((sum, ut) => {
                return sum + (ut.rating * (taskSimilarity[ut.task_id][task._id] || 0));
            }, 0);
            return { task, score };
        });

        // Sort and filter recommendations
        const topRecommendations = recommendations
            .sort((a, b) => b.score - a.score)
            .filter(rec => !userRatedTasks.some(ut => ut.task_id.toString() === rec.task._id.toString()))
            .slice(0, 5);

        res.json(topRecommendations.map(rec => rec.task));
    } catch (err) {
        console.error('Error in recommendations route:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
