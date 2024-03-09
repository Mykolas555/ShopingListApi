const Item = require('../models/itemModel')
const User = require('../models/userModel');

exports.getUserItems = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const userItems = await Item.find({ user: req.params.userId });
        res.status(200).json({
            status: "Success to get all user items",
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    Items: userItems,
                },
            },
        });
        return
    } catch (err) {
        res.status(404).json({
            status: "User Items not found",
            message: err.message,
        });
    }
};
