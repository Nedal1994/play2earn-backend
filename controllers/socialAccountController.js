// controllers/socialAccountController.js
const SocialAccount = require('../models/socialAccount');

// Get all social accounts
exports.getAllSocialAccounts = async (req, res) => {
    try {
        const socialAccounts = await SocialAccount.find();
        res.json(socialAccounts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Link a social account
exports.linkSocialAccount = async (req, res) => {
    const { platform, username } = req.body;
    try {
        let account = await SocialAccount.findOne({ platform });
        if (account) {
        account.username = username;
        account.linked_status = true;
        } else {
        account = new SocialAccount({
            platform,
            username,
            linked_status: true
        });
        }
        await account.save();
        res.status(201).json(account);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Unlink a social account
exports.unlinkSocialAccount = async (req, res) => {
    const { platform } = req.body;
    try {
        const account = await SocialAccount.findOne({ platform });
        if (account) {
        account.linked_status = false;
        await account.save();
        res.json({ message: 'Account unlinked successfully', account });
        } else {
        res.status(404).json({ message: 'Account not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
