const UserDetailSurvey = require('../models/userDetailSurvey');

// Create user detail survey
exports.createUserDetailSurvey = async (req, res) => {
    try {
        // Check if the user already has filled out the survey
        const existingSurvey = await UserDetailSurvey.findOne({ user_id: req.body.user_id });
        if (existingSurvey) {
            return res.status(400).json({ message: 'User details have already been submitted.' });
        }

        // Create a new user detail survey
        const userDetail = new UserDetailSurvey(req.body);
        const savedUserDetail = await userDetail.save();
        res.status(201).json({ message: 'User details saved successfully.', userDetail: savedUserDetail });
    } catch (error) {
        console.error('Error creating user detail survey:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get user detail survey by user_id (to check if user has filled the details)
exports.getUserDetailSurvey = async (req, res) => {
    try {
        const userDetail = await UserDetailSurvey.findOne({ user_id: req.params.user_id });
        if (!userDetail) {
            return res.status(404).json({ message: 'User details not found.' });
        }
        res.status(200).json(userDetail);
    } catch (error) {
        console.error('Error getting user detail survey:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
