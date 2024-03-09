const Item = require('../models/itemModel')


exports.createItem = async (req, res) => {
    try {
        const newItem = await Item.create({ ...req.body, user: req.params.userId });
        res.status(201).json({
            status: "created successfully",
            message: "New list item is created",
            data: { newItem },
        });
    } catch (err) {
        res.status(404).json({
            status: 'failed to create new item',
            message: err.message 
        });
    }
};


exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findOneAndUpdate(
            { _id: req.params.itemId, user: req.params.userId },
            req.body,
            { new: true, runValidators: true }
        );
        res.status(200).json({
            status: "success",
            message: "Item is updated",
            data: { item },
        });
    } catch (err) {
        res.status(404).json({
            status: "Fail to update item",
            message: err.message
        });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findOneAndDelete({
            _id: req.params.itemId,
            user: req.params.userId,
        });
        res.status(200).json({
            status: "success",
            message: "Item is deleted",
        });
    } catch (err) {
        res.status(500).json({
            status: "Fail to delete item",
            message: err.message
        });
    }
};