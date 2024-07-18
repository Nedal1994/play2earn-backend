const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
const Admin = require('../models/admin');
const User = require('../models/user');

// const JWT_SECRET = process.env.JWT_SECRET; //uncomment it later (for jwt)

exports.registerUser = async (req, res) => {
    const { username, email, password, profile_pic_url } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profile_pic_url,
            tasks_completed: 0,
            total_rewards: 0
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.registerAdmin = async (req, res) => {
    const { username, email, password, profile_pic_url } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword,
            profile_pic_url
        });

        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Email or password is wrong' });
    
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ error: 'Email or password is wrong' });
    
        // const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' }); //jwt uncomment later
        // res.header('auth-token', token).json({ token });
        res.json({ message: 'Login successful', user }); 
        // res.json({ message: 'Login successful', token }); //uncomment it later (for token)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ error: 'Email or password is wrong' });
    
        const validPass = await bcrypt.compare(password, admin.password);
        if (!validPass) return res.status(400).json({ error: 'Email or password is wrong' });

        // const token = jwt.sign({ _id: admin._id }, JWT_SECRET, { expiresIn: '1h' }); //jwt uncomment later
        // res.header('auth-token', token).json({ token });
        res.json({ message: 'Login successful', admin }); 
        // res.json({ message: 'Login successful', token }); //uncomment it later (for token)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
