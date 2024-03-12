const mongoose = require("mongoose")

const ItemSchema = new mongoose.Schema({
    item:{
        type:String,
        required: [true, "A cart must have a item"],
        min: [2, 'name has to have at least two symbols'],
        match: [/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces']
    },
    location:{
        type:String,
        required:[true, 'A item must have a location'],
        min: [2, 'last name has to have at least two symbols'],
    },
    amount: {
        type:String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'An item must be associated with a user']
    }
})

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item