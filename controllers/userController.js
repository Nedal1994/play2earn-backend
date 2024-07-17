const User = require('../models/user');

// // Create a new user
// exports.createUser = async (req, res) => {
//     try {
//         const user = new User(req.body);
//         await user.save();
//         res.status(201).send(user);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };

// Get a user's profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
        return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a user's profile
exports.updateUserProfile = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'password', 'profile_pic_url', 'tasks_completed', 'total_rewards'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
        return res.status(404).send();
        }

        updates.forEach((update) => {
        user[update] = req.body[update];
        });
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
        return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};
